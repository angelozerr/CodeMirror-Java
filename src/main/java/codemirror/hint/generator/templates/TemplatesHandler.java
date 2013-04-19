package codemirror.hint.generator.templates;

public interface TemplatesHandler {

	void startTemplates(String name, String context) throws Exception;

	void endTemplates() throws Exception;

	void addTemplate(String name, String description, String template) throws Exception;
}
