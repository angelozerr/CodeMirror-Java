package codemirror.hint.generator.xquery.xmlmodules;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Properties;

import javax.xml.parsers.ParserConfigurationException;

import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;
import org.xml.sax.helpers.XMLReaderFactory;

import codemirror.hint.generator.Model2JS;
import codemirror.hint.generator.xquery.CodeMirrorModuleHandler;
import codemirror.hint.generator.xquery.ModuleHandler;

public class XMLModule2JS extends Model2JS {

	public static void main(String[] args) throws ParserConfigurationException,
			SAXException, IOException {

		XMLModule2JS module2JS = new XMLModule2JS();

		Properties properties = new Properties();
		File tokenPropertiesDir = new File(
				"../sidoc-commons/dev/build/properties");
		if (tokenPropertiesDir.exists()) {
			File file = null;
			File[] files = tokenPropertiesDir.listFiles();
			for (int i = 0; i < files.length; i++) {
				file = files[i];
				if (file.getName().startsWith("xmldb-")) {
					properties.load(new FileInputStream(file));
				}
			}
		}

		File dir = null;
		File[] dirs = new File("../").listFiles();
		for (int i = 0; i < dirs.length; i++) {
			dir = dirs[i];
			if (dir.isDirectory()) {
				File xqlModulesDir = new File(dir, "xql-modules");
				if (xqlModulesDir.exists()) {
					// xql-modules dir
					addModule(module2JS, xqlModulesDir);
				}
				File xqueryLib = new File(dir, "xquery/lib");
				if (xqueryLib.exists()) {
					// xql-modules dir
					addModule(module2JS, xqueryLib);
				}
			}
		}
		// module2JS.generate(new File("sidoc-modules.js"));

		File out = new File(
				"../_xquery-editor/sidoc/addon/hint/sidoc-modules.js");
		FileWriter writer = null;
		try {
			writer = new FileWriter(out);
			// StringWriter writer = new StringWriter();
			module2JS.generate(new CodeMirrorModuleHandler(writer), properties);
		} finally {
			if (writer != null) {
				writer.flush();
				writer.close();
			}
		}
		// System.err.println(writer.toString());

	}

	private static void addModule(XMLModule2JS module2JS, File file) {
		if (file.isDirectory()) {
			File[] files = file.listFiles();
			for (int i = 0; i < files.length; i++) {
				addModule(module2JS, files[i]);
			}
		} else {
			if (file.getName().endsWith(".xml")) {
				module2JS.addFile(file);
			}
		}
	}

	public void generate(File file, Properties properties) throws IOException,
			SAXException {
		FileWriter writer = null;
		ModuleHandler handler = null;
		try {
			writer = new FileWriter(file);
			handler = new CodeMirrorModuleHandler(writer);
			generate(handler, properties);
		} finally {
			if (writer != null) {
				writer.flush();
				writer.close();
			}
		}
	}

	public void generate(ModuleHandler handler, Properties properties)
			throws SAXException, IOException {
		int nbModules = 0;
		for (File file : getFiles()) {
			if (generate(file, handler, properties, nbModules)) {
				nbModules++;
			}
		}
	}

	private boolean generate(File file, ModuleHandler moduleHandler,
			Properties properties, int nbModules) throws SAXException,
			IOException {
		FileReader reader = null;
		try {

			System.err.println(file.getPath());
			reader = new FileReader(file);
			XMLReader xmlReader = XMLReaderFactory.createXMLReader();
			XMLModule2JsonHandler handler = new XMLModule2JsonHandler(
					moduleHandler, properties);
			xmlReader.setContentHandler(handler);
			xmlReader.parse(new InputSource(reader));
			return handler.hasModule();
		} finally {
			if (reader != null) {
				reader.close();
			}
		}
	}

}
