package codemirror.hint.generator;

import java.io.Writer;
import java.util.List;

import codemirror.json.JsonUtils;

public class CodeMirrorModuleHandler implements ModuleHandler {

	private final Writer writer;
	private int nbFunctions;

	public CodeMirrorModuleHandler(Writer writer) {
		this.writer = writer;
	}

	public void startModule(String prefix, String namespaceURI, String location)
			throws Exception {
		startModule(prefix, null, namespaceURI, location);
	}

	public void startModule(String prefix, Boolean prefixRequired,
			String namespaceURI, String location) throws Exception {
		this.nbFunctions = 0;
		writer.write("CodeMirror.defineXQueryModule(");
		JsonUtils.beginJsonObject(writer);
		boolean hasPrefix = prefix != null && prefix.length() > 0;
		if (hasPrefix) {
			JsonUtils.addJsonField("prefix", prefix, true, true, writer);
			if (prefixRequired != null && !prefixRequired) {
				JsonUtils.addJsonField("prefixRequired", false, false, true,
						writer);
			}
		}
		JsonUtils.addJsonField("namespace", namespaceURI, !hasPrefix, true,
				writer);
		if (!(location == null || location.length() < 1)) {
			JsonUtils.addJsonField("location", location, false, true, writer);
		}
		JsonUtils.addString(",\"functions\":", false, writer);
		JsonUtils.beginJsonArray(writer);
	}

	public void endModule() throws Exception {
		JsonUtils.endJsonArray(writer);
		JsonUtils.endJsonObject(writer);

		writer.write(");\n");

	}

	public void addFunction(String funcName, List<Parameter> parameters,
			String returnType) throws Exception {
		if (nbFunctions > 0) {
			JsonUtils.addFieldsSeparator(writer);
		}
		JsonUtils.beginJsonObject(writer);
		JsonUtils.addJsonField("name", funcName.trim(), true, true, writer);
		String as = returnType;
		if (as != null && as.length() > 0) {
			JsonUtils.addJsonField("as", as, false, true, writer);
		}
		if (parameters != null) {
			int nbParams = 0;
			for (Parameter parameter : parameters) {
				if (nbParams == 0) {
					JsonUtils.addString(",\"params\":", false, writer);
					JsonUtils.beginJsonArray(writer);
				} else {
					JsonUtils.addFieldsSeparator(writer);
				}
				JsonUtils.beginJsonObject(writer);
				JsonUtils.addJsonField("name", parameter.getName(), true, true,
						writer);
				String type = parameter.getType();
				if (type != null) {
					JsonUtils.addJsonField("as", type, false, true, writer);
				}
				JsonUtils.endJsonObject(writer);
				nbParams++;
			}
		}
		this.nbFunctions++;

	}
}
