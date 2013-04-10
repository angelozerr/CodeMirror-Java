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

import codemirror.hint.generator.CodeMirrorModuleHandler;
import codemirror.hint.generator.ModuleHandler;

public class XMLFunctions2JS {

	private final List<File> files;

	public class Namespace {

		public final String namespaceURI;
		public final boolean prefixRequired;

		public Namespace(String namespaceURI, boolean prefixRequired) {
			this.namespaceURI = namespaceURI;
			this.prefixRequired = prefixRequired;
		}

	}

	private final Map<String, Namespace> namespaces;

	public XMLFunctions2JS() {
		this.files = new ArrayList<File>();
		this.namespaces = new HashMap<String, Namespace>();
	}

	public void addFile(File file) {
		this.files.add(file);
	}

	public void addNamespace(String prefix, String namespaceURI) {
		addNamespace(prefix, namespaceURI, true);
	}

	public void addNamespace(String prefix, String namespaceURI,
			boolean prefixRequired) {
		this.namespaces
				.put(prefix, new Namespace(namespaceURI, prefixRequired));
	}

	public static void main(String[] args) {

		XMLFunctions2JS functions2js = new XMLFunctions2JS();
		functions2js.addNamespace("xs", "http://www.w3.org/2001/XMLSchema");
		functions2js.addNamespace("fn",
				"http://www.w3.org/2005/xpath-functions", false);
		functions2js.addFile(new File(
				"src/main/resources/modules/systemfunctions"));
		try {
			functions2js.generate(new File("target/modules/systemfunctions"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		functions2js = new XMLFunctions2JS();
		functions2js.addNamespace("xhive",
				"http://www.x-hive.com/2001/08/xquery-function");
		functions2js.addFile(new File("src/main/resources/modules/xhive"));
		try {
			functions2js.generate(new File("target/modules/xhive"));
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
			ModuleHandler handler = null;
			try {
				writer = new FileWriter(outFile);
				handler = new CodeMirrorModuleHandler(writer);
				generate(file, handler);
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

	private void generate(File file, ModuleHandler handler)
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
