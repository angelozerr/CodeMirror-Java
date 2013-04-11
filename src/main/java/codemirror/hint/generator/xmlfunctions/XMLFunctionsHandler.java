package codemirror.hint.generator.xmlfunctions;

import java.util.Map;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import codemirror.hint.generator.Function;
import codemirror.hint.generator.ModuleHandler;
import codemirror.hint.generator.xmlfunctions.XMLFunctions2JS.Namespace;

public class XMLFunctionsHandler extends DefaultHandler {

	private static final String FUNCTION_ELT = "function";
	private static final String SIGNATURE_ELT = "signature";
	private static final String SUMMARY_ELT = "summary";

	private final ModuleHandler handler;
	private final Map<String, Namespace> namespaces;

	private boolean signatureParsing;
	private boolean summaryParsing;
	private String currentPrefix;
	private StringBuilder currentFunction;
	private final StringBuilder doc;

	public XMLFunctionsHandler(ModuleHandler handler,
			Map<String, Namespace> namespaces) {
		this.handler = handler;
		this.namespaces = namespaces;
		this.currentPrefix = null;
		this.signatureParsing = false;
		this.currentFunction = null;
		this.doc = new StringBuilder();
	}

	@Override
	public void startElement(String uri, String localName, String name,
			Attributes attributes) throws SAXException {
		if ((FUNCTION_ELT).equals(name)) {

		} else if ((SIGNATURE_ELT).equals(name)) {
			this.currentFunction = new StringBuilder();
			this.signatureParsing = true;
		} else if ((SUMMARY_ELT).equals(name)) {
			this.summaryParsing = true;
			this.doc.setLength(0);
		} else if (summaryParsing) {
			doc.append(" ");
			doc.append('<');
			doc.append(name);
			doc.append('>');
		}
		super.startElement(uri, localName, name, attributes);
	}

	@Override
	public void endElement(String uri, String localName, String name)
			throws SAXException {
		if ((FUNCTION_ELT).equals(name)) {
			try {
				Function.parse(currentFunction.toString(), doc.toString(),
						handler);
			} catch (Exception e) {
				throw new SAXException(e);
			}
			this.currentFunction = null;
		} else if ((SIGNATURE_ELT).equals(name)) {

			String function = currentFunction.toString();
			int prefixIndex = function.indexOf(":");
			if (prefixIndex != -1) {
				String prefix = function.substring(0, prefixIndex);
				function = function.substring(prefixIndex + 1,
						function.length());
				Namespace namespace = namespaces.get(prefix);
				String namespaceURI = "";
				boolean prefixRequired = true;
				if (namespace == null) {
					namespaceURI = prefix;
				} else {
					namespaceURI = namespace.namespaceURI;
					prefixRequired = namespace.prefixRequired;
				}
				try {
					if (currentPrefix == null) {
						// start module

						handler.startModule(prefix, prefixRequired,
								namespaceURI, null);

					} else {
						if (!currentPrefix.equals(prefix)) {
							handler.endModule();
							handler.startModule(prefix, prefixRequired,
									namespaceURI, null);
						}
					}
				} catch (Exception e) {
					throw new SAXException(e);
				}
				currentPrefix = prefix;
			}
			currentFunction = new StringBuilder(function);
			this.signatureParsing = false;
		} else if ((SUMMARY_ELT).equals(name)) {
			this.summaryParsing = false;
		} else if (summaryParsing) {
			doc.append("</");
			doc.append(name);
			doc.append('>');
			doc.append(" ");
		}
		super.endElement(uri, localName, name);
	}

	@Override
	public void endDocument() throws SAXException {
		if (currentPrefix != null) {
			try {
				handler.endModule();
			} catch (Exception e) {
				throw new SAXException(e);
			}
		}
	}

	@Override
	public void characters(char[] ch, int start, int length)
			throws SAXException {
		String s = null;
		if (signatureParsing || summaryParsing) {
			s = String.valueOf(ch, start, length);
			s = s.replaceAll("\n", "").trim();
			s = s.replaceAll("\t", " ").trim();
		}
		if (signatureParsing) {
			currentFunction.append(s);
		} else if (summaryParsing) {
			doc.append(s);
		}
		super.characters(ch, start, length);
	}
}
