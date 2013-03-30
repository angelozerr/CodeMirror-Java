package codemirror.hint.generator.xmlfunctions;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;
import org.xml.sax.helpers.XMLReaderFactory;

import codemirror.hint.generator.XMLModule2JsonHandler;

public class XMLFunctions2JS {

	private final List<File> files;
	private final Map<String, String> namespaces;

	public XMLFunctions2JS() {
		this.files = new ArrayList<File>();
		this.namespaces = new HashMap<String, String>();
	}

	public void addFile(File file) {
		this.files.add(file);
	}
	
	public void addNamespace(String prefix, String namespace) {
		this.namespaces.put(prefix, namespace);
	}

	public static void main(String[] args) {
		
		XMLFunctions2JS functions2js = new XMLFunctions2JS();
		functions2js.addNamespace("xs", "http://www.w3.org/2001/XMLSchema");
		functions2js.addNamespace("fn", "http://www.w3.org/2005/xpath-functions");
		functions2js.addFile(new File(
				"src/main/resources/modules/systemfunctions"));

		try {
			functions2js.generate(new File("target/modules/systemfunctions"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void generate(File outBaseDir) throws Exception {
		for (File file : files) {
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
			System.out.println("==============>" + file.getPath());

			String path = file.getPath();
			path = path.substring(inBaseDir.getPath().length() + 1,
					path.length())
					+ ".js";

			File outFile = new File(outBaseDir, path);
			outFile.getParentFile().mkdirs();
			Writer writer = null;
			XMLModule2JsonHandler handler = null;
			try {
				writer = new FileWriter(outFile);
				handler = new XMLModule2JsonHandler(writer, null);
				generate(file, handler);
			} finally {
				if (writer != null) {
					writer.flush();
					writer.close();
				}
			}
		}
	}

	private void generate(File file, XMLModule2JsonHandler handler)
			throws SAXException, IOException {
		FileReader reader = null;
		try {

			System.err.println(file.getPath());
			reader = new FileReader(file);
			XMLReader xmlReader = XMLReaderFactory.createXMLReader();
			XMLFunctionsHandler functionsHandler = new XMLFunctionsHandler(
					handler, namespaces);
			xmlReader.setContentHandler(functionsHandler);
			xmlReader.parse(new InputSource(reader));
		} finally {
			if (reader != null) {
				reader.close();
			}
		}
	}

}