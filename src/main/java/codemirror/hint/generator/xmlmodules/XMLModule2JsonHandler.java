package codemirror.hint.generator.xmlmodules;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import codemirror.hint.generator.ModuleHandler;
import codemirror.hint.generator.ModuleHandler.Parameter;

public class XMLModule2JsonHandler extends DefaultHandler {

	private static final String MODULE_ELT = "XQLModule";
	private static final String MODULE_PREFIX_ATTR = "prefix";
	private static final String MODULE_NAMESPACE_URI_ATTR = "namespace-uri";

	private static final String FUNCTION_ELT = "function";
	private static final String FUNCTION_NAME_ATTR = "name";
	private static final String FUNCTION_PARAM_ELT = "param";
	private static final String FUNCTION_PARAM_NAME_ATTR = "name";
	private static final String AS_ATTR = "as";

	private static final String DOCUMENTATION_ELT = "documentation";

	private final ModuleHandler handler;
	private final Properties properties;
	private boolean hasModule;
	private int nbFunctions;
	private boolean functionParsing;

	private String funcName;
	private String returnType;
	private final List<Parameter> parameters;
	private final StringBuilder doc;
	private boolean documentationParsing;
	private String currentParamName;

	public XMLModule2JsonHandler(ModuleHandler handler, Properties properties) {
		this.handler = handler;
		this.properties = properties;
		this.hasModule = false;
		this.nbFunctions = 0;
		this.functionParsing = false;
		this.funcName = null;
		this.parameters = new ArrayList<ModuleHandler.Parameter>();
		this.doc = new StringBuilder();
		this.documentationParsing = false;
	}

	@Override
	public void startElement(String uri, String localName, String name,
			Attributes attributes) throws SAXException {
		try {
			if ((MODULE_ELT).equals(name)) {
				this.hasModule = true;
				this.nbFunctions = 0;
				String prefix = attributes.getValue(MODULE_PREFIX_ATTR);
				String namespaceURI = getValue(attributes
						.getValue(MODULE_NAMESPACE_URI_ATTR));
				String location = getValue(attributes.getValue("location"));
				handler.startModule(prefix, namespaceURI, location);

			} else if (FUNCTION_ELT.equals(name)) {
				this.funcName = attributes.getValue(FUNCTION_NAME_ATTR);
				this.returnType = attributes.getValue(AS_ATTR);
				this.nbFunctions++;
				this.functionParsing = true;
				this.parameters.clear();
				this.doc.setLength(0);
				this.currentParamName = null;
			} else if (FUNCTION_PARAM_ELT.equals(name) && functionParsing) {
				currentParamName = attributes
						.getValue(FUNCTION_PARAM_NAME_ATTR);
				if (doc.length() > 0) {
					if (this.parameters.size() == 0) {
						doc.append("<ul>");
					}
					doc.append("<li><b>");
					doc.append(currentParamName);
					doc.append("</b>: ");
				}
				this.parameters.add(new Parameter(currentParamName, attributes
						.getValue(AS_ATTR)));

			} else if (DOCUMENTATION_ELT.equals(name)) {
				this.documentationParsing = true;
			}
		} catch (Exception e) {
			throw new SAXException(e);
		}
		super.startElement(uri, localName, name, attributes);
	}

	private String getValue(String value) {
		if (properties == null) {
			return value;
		}
		int fromIndex = value.indexOf("@");
		if (fromIndex == -1) {
			return value;
		}
		int toIndex = value.indexOf("@", fromIndex + 1);
		if (toIndex == -1) {
			return value;
		}
		String token = value.substring(fromIndex + 1, toIndex);
		String newValue = (String) properties.get(token);
		if (newValue != null) {
			String beforeToken = value.substring(0, fromIndex);
			String afterToken = value.substring(toIndex + 1, value.length());
			return getValue(beforeToken + newValue + afterToken);
		}
		return value;
	}

	@Override
	public void endElement(String uri, String localName, String name)
			throws SAXException {
		try {
			if ((MODULE_ELT).equals(name)) {
				handler.endModule();
			} else if (FUNCTION_ELT.equals(name)) {
				if (this.parameters.size() > 0) {
					doc.append("</ul>");
				}
				handler.addFunction(funcName, parameters, returnType,
						doc.toString());
				this.functionParsing = false;
				this.doc.setLength(0);
			} else if (FUNCTION_PARAM_ELT.equals(name) && functionParsing) {
				if (doc.length() > 0) {
					doc.append("</li>");
				}
				this.currentParamName = null;
			} else if (DOCUMENTATION_ELT.equals(name)) {
				this.documentationParsing = false;
			}
		} catch (Exception e) {
			throw new SAXException(e);
		}
		super.endElement(uri, localName, name);
	}

	public boolean hasModule() {
		return hasModule;
	}

	@Override
	public void characters(char[] ch, int start, int length)
			throws SAXException {
		if (documentationParsing) {
			String s = String.valueOf(ch, start, length);
			s = String.valueOf(ch, start, length);
			s = s.replaceAll("\n", "").trim();
			s = s.replaceAll("\t", " ").trim();
			doc.append(s);
		}
		super.characters(ch, start, length);
	}
}
