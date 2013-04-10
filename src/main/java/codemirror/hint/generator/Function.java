package codemirror.hint.generator;

import java.util.ArrayList;
import java.util.List;

import org.xml.sax.helpers.AttributesImpl;

import codemirror.hint.generator.ModuleHandler.Parameter;
import codemirror.hint.generator.xmlmodules.XMLModule2JsonHandler;

public class Function {

	public static void parse(String function, String doc, ModuleHandler handler)
			throws Exception {
		String returnType = null;
		boolean searchReturnType = false;
		int index = function.indexOf("(");
		String funcName = function.substring(0, index);

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
						parameter.setType(buffer.toString());
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
							parameter.setName(buffer.toString());
							if (parameter.getName().startsWith("$")) {
								parameter.setName(parameter.getName().substring(1,
										parameter.getName().length()));
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
					parameter.setType(buffer.toString());
					buffer.setLength(0);
					parameter = null;
				}
				break;
			default:
				buffer.append(c);
			}
		}

		handler.addFunction(funcName, parameters, returnType, doc);

	}
}
