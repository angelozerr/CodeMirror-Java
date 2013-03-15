package codemirror.lint;

import java.io.Writer;

public class StreamLintHandler implements LintHandler {

	private final Writer writer;

	public StreamLintHandler(Writer writer){
		this.writer = writer;
	}

	public void addAnnotation(int startLine, int startChar, int endLine,
			int endChar, String message) {
		// TODO Auto-generated method stub

	}

}
