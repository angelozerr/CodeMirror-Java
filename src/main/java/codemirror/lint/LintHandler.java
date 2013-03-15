package codemirror.lint;

public interface LintHandler {

	void addAnnotation(int startLine, int startChar, int endLine, int endChar, String message);
}
