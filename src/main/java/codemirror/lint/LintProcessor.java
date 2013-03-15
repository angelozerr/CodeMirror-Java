package codemirror.lint;

public interface LintProcessor {

	String getMode();
	
	void lint(String code, LintHandler handler, Object context);
	
}
