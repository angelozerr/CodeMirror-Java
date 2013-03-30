package codemirror.hint.generator;

import java.util.ArrayList;
import java.util.List;

import org.xml.sax.SAXException;
import org.xml.sax.helpers.AttributesImpl;

public class Function {

	private static class Parameter {
		public String name;
		public String type;
	}

	public static void parse(String function, XMLModule2JsonHandler handler) throws SAXException {
		String returnType = null;
		boolean searchReturnType = false;
		int index = function.indexOf("(");
		String funcName = function.substring(0, index);

		AttributesImpl functionAttributes = new AttributesImpl();
		functionAttributes.addAttribute("",
				XMLModule2JsonHandler.FUNCTION_NAME_ATTR,
				XMLModule2JsonHandler.FUNCTION_NAME_ATTR, "CDATA", funcName.trim());

		String afterFunctionName = function.substring(funcName.length(),
				function.length());
		char[] chars = afterFunctionName.toCharArray();

		List<Parameter> parameters = new ArrayList<Parameter>();

		char c = 0;
		int bracket = 0;
		Parameter parameter = null;
		StringBuilder buffer = new StringBuilder();
		for (int i = 0; i < chars.length; i++) {
			c = chars[i];
			switch (c) {
			case '(':
				if (bracket > 0 || searchReturnType) {
					buffer.append(c);
				}
				if (!searchReturnType)
					bracket++;
				break;
			case ')':
				if (!searchReturnType)
					bracket--;
				if (bracket > 0 || searchReturnType) {
					buffer.append(c);
				} else {
					if (parameter != null) {
						parameter.type = buffer.toString();
						buffer.setLength(0);
						parameter = null;
					}
				}
				break;
			case ' ':
				if (bracket > 0) {
					if (parameter == null) {
						if (buffer.length() > 0) {
							parameter = new Parameter();
							parameter.name = buffer.toString();
							if (parameter.name.startsWith("$")) {
								parameter.name = parameter.name.substring(1,
										parameter.name.length());
							}
							parameters.add(parameter);
							buffer.setLength(0);
						}
					} else {
						if (buffer.toString().equals("as")) {
							buffer.setLength(0);
						} else {
							buffer.append(c);
						}
					}
				} else {
					if (buffer.toString().equals("as")) {
						buffer.setLength(0);
						searchReturnType = true;
					} else if (searchReturnType) {
						returnType = buffer.toString();
						break;
					}
				}
				break;
			case ',':
				if (parameter != null) {
					parameter.type = buffer.toString();
					buffer.setLength(0);
					parameter = null;
				}
				break;
			default:
				buffer.append(c);
			}
		}

		// String parameters =
		// afterFunction.substring(funcName.length()+1,
		// index);

		// String functionAs =
		// getAs(method.returnType());
		if (returnType != null) {
			functionAttributes.addAttribute("", XMLModule2JsonHandler.AS_ATTR,
					XMLModule2JsonHandler.AS_ATTR, "CDATA", returnType);
		}
		handler.startElement("", XMLModule2JsonHandler.FUNCTION_ELT,
				XMLModule2JsonHandler.FUNCTION_ELT, functionAttributes);

		// Loop for Parameters
		for (Parameter p : parameters) {
			AttributesImpl paramAttributes = new AttributesImpl();
			paramAttributes.addAttribute("",
					XMLModule2JsonHandler.FUNCTION_PARAM_NAME_ATTR,
					XMLModule2JsonHandler.FUNCTION_PARAM_NAME_ATTR, "CDATA",
					p.name);
			paramAttributes.addAttribute("", XMLModule2JsonHandler.AS_ATTR,
					XMLModule2JsonHandler.AS_ATTR, "CDATA", p.type);
			handler.startElement("", XMLModule2JsonHandler.FUNCTION_PARAM_ELT,
					XMLModule2JsonHandler.FUNCTION_PARAM_ELT, paramAttributes);
			handler.endElement("", XMLModule2JsonHandler.FUNCTION_PARAM_ELT,
					XMLModule2JsonHandler.FUNCTION_PARAM_ELT);
		}
		handler.endElement("", XMLModule2JsonHandler.FUNCTION_ELT,
				XMLModule2JsonHandler.FUNCTION_ELT);
	}
}
