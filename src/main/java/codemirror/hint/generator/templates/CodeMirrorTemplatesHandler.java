package codemirror.hint.generator.templates;

import java.io.Writer;

import codemirror.json.JsonUtils;

public class CodeMirrorTemplatesHandler implements TemplatesHandler {

	private final Writer writer;

	private int nbTemplates;

	public CodeMirrorTemplatesHandler(Writer writer) {
		this.writer = writer;
		this.nbTemplates = 0;
	}

	public void startTemplates(String name, String context) throws Exception {
		this.writer.write("(function() {var templates = {");
		JsonUtils.addJsonField("name", name, true, true, writer);
		JsonUtils.addJsonField("context", context, false, true, writer);
		this.writer.write(",\"templates\" : [");
	}

	public void endTemplates() throws Exception {
		this.writer.write("]");
		this.writer
				.write("};CodeMirror.templatesHint.addTemplates(templates);})();");
	}

	public void addTemplate(String name, String description, String template)
			throws Exception {
		if (nbTemplates > 0) {
			this.writer.write(",");
		}
		JsonUtils.beginJsonObject(writer);
		JsonUtils.addJsonField("name", name, true, true, writer);
		if (description != null && description.length() > 0) {
			JsonUtils.addJsonField("description", description, false, true,
					writer);
		}
		JsonUtils.addJsonField("template", template, false, true, writer);
		JsonUtils.endJsonObject(writer);
		this.nbTemplates++;
	}
}
