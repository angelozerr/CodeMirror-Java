package codemirror.hint.generator.xmlfunctions;

import java.util.Map;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.AttributesImpl;
import org.xml.sax.helpers.DefaultHandler;

import codemirror.hint.generator.Function;
import codemirror.hint.generator.XMLModule2JsonHandler;

public class XMLFunctionsHandler extends DefaultHandler {

	private static final String FUNCTION_ELT = "function";
	private static final String SIGNATURE_ELT = "signature";

	private final XMLModule2JsonHandler handler;
	private final Map<String, String> namespaces;

	private boolean signatureParsing;
	private String currentPrefix;
	private StringBuilder currentFunction;

	public XMLFunctionsHandler(XMLModule2JsonHandler handler,
			Map<String, String> namespaces) {
		this.handler = handler;
		this.namespaces = namespaces;
		this.currentPrefix = null;
		this.signatureParsing = false;
		this.currentFunction = null;
	}

	@Override
	public void startElement(String uri, String localName, String name,
			Attributes attributes) throws SAXException {
		if ((FUNCTION_ELT).equals(name)) {

		} else if ((SIGNATURE_ELT).equals(name)) {
			this.currentFunction = new StringBuilder();
			this.signatureParsing = true;
		}
		super.startElement(uri, localName, name, attributes);
	}

	@Override
	public void endElement(String uri, String localName, String name)
			throws SAXException {
		if ((FUNCTION_ELT).equals(name)) {

		} else if ((SIGNATURE_ELT).equals(name)) {

			String function = currentFunction.toString();
			int prefixIndex = function.indexOf(":");
			if (prefixIndex != -1) {
				String prefix = function.substring(0, prefixIndex);
				function = function.substring(prefixIndex + 1, function.length());
				String namespace = namespaces.get(prefix);
				if (namespace == null) {
					namespace = prefix;
				}
				if (currentPrefix == null) {
					// start module					
					startModule(prefix, namespace);
				} else {
					if (!currentPrefix.equals(prefix)) {
						endModule();
						startModule(prefix, namespace);
					}
				}
				currentPrefix = prefix;
				Function.parse(function, handler);
			}
			this.currentFunction = null;
			this.signatureParsing = false;
		}
		super.endElement(uri, localName, name);
	}

	private void startModule(String modulePrefix, String moduleNamespace)
			throws SAXException {
		AttributesImpl moduleAttributes = new AttributesImpl();
		moduleAttributes
				.addAttribute("", XMLModule2JsonHandler.MODULE_PREFIX_ATTR,
						XMLModule2JsonHandler.MODULE_PREFIX_ATTR, "CDATA",
						modulePrefix);

		moduleAttributes.addAttribute("",
				XMLModule2JsonHandler.MODULE_NAMESPACE_URI_ATTR,
				XMLModule2JsonHandler.MODULE_NAMESPACE_URI_ATTR, "CDATA",
				moduleNamespace);
		handler.startElement("", XMLModule2JsonHandler.MODULE_ELT,
				XMLModule2JsonHandler.MODULE_ELT, moduleAttributes);

	}

	private void endModule() throws SAXException {
		handler.endElement("", XMLModule2JsonHandler.MODULE_ELT,
				XMLModule2JsonHandler.MODULE_ELT);
	}

	@Override
	public void endDocument() throws SAXException {
		if (currentPrefix != null) {
			endModule();
		}
	}

	@Override
	public void characters(char[] ch, int start, int length)
			throws SAXException {
		if (signatureParsing) {
			currentFunction.append(String.valueOf(ch, start, length));
		}
		super.characters(ch, start, length);
	}
}
