package codemirror.hint.generator.templates.eclipse;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.Properties;

import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;
import org.xml.sax.helpers.XMLReaderFactory;

import codemirror.hint.generator.Model2JS;
import codemirror.hint.generator.templates.CodeMirrorTemplatesHandler;
import codemirror.hint.generator.templates.TemplatesHandler;

public class EclipseTemplate2JS extends Model2JS {

	public static void main(String[] args) {

		EclipseTemplate2JS templates2js = new EclipseTemplate2JS();
		try {
			templates2js.addFile(new File("src/main/resources/templates"));
			templates2js.generate(new File("target/templates"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void generate(File outBaseDir) throws Exception {
		for (File file : getFiles()) {
			generate(file, file, outBaseDir);
		}
	}

	public void generate(File file, File inBaseDir, File outBaseDir)
			throws SAXException, IOException {
		if (file.isDirectory()) {
			File[] dirs = file.listFiles();
			for (int i = 0; i < dirs.length; i++) {
				generate(dirs[i], inBaseDir, outBaseDir);
			}

		} else {
			if (!file.getPath().endsWith(".xml")) {
				return;
			}
			System.out.println("==============>" + file.getPath());

			String pathWithoutExt = file.getPath();
			int index = pathWithoutExt.lastIndexOf('.');
			pathWithoutExt = pathWithoutExt.substring(0, index);

			String path = file.getPath().substring(
					inBaseDir.getPath().length() + 1, pathWithoutExt.length())
					+ ".js";

			Properties properties = new Properties();
			String propertiesFileName = pathWithoutExt + ".properties";
			File propertiesFile = new File(propertiesFileName);
			if (propertiesFile.exists()) {
				properties.load(new FileInputStream(propertiesFile));
			}

			File outFile = new File(outBaseDir, path);
			outFile.getParentFile().mkdirs();
			Writer writer = null;
			TemplatesHandler handler = null;
			try {
				writer = new FileWriter(outFile);
				handler = new CodeMirrorTemplatesHandler(writer);
				generate(file, properties, handler);
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (writer != null) {
					writer.flush();
					writer.close();
				}
			}
		}
	}

	private void generate(File file, Properties properties,
			TemplatesHandler handler) throws SAXException, IOException {
		FileReader reader = null;
		try {

			String name = file.getParentFile().getName();
			String context = name;

			System.err.println(file.getPath());
			reader = new FileReader(file);
			XMLReader xmlReader = XMLReaderFactory.createXMLReader();
			EclipseTemplate2JSHandler templatesHandler = new EclipseTemplate2JSHandler(
					name, context, handler, properties);
			xmlReader.setContentHandler(templatesHandler);
			xmlReader.parse(new InputSource(reader));
		} finally {
			if (reader != null) {
				reader.close();
			}
		}
	}

}
