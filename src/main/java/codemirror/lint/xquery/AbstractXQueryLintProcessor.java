package codemirror.lint.xquery;

import codemirror.lint.LintProcessor;

public abstract class AbstractXQueryLintProcessor implements LintProcessor {

	public String getMode() {
		return "xquery";
	}

}
