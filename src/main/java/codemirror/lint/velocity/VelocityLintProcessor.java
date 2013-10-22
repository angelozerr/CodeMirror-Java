package codemirror.lint.velocity;

import java.io.Reader;
import java.io.StringReader;
import java.io.StringWriter;

import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.apache.velocity.runtime.RuntimeInstance;
import org.apache.velocity.runtime.parser.ParseException;
import org.apache.velocity.runtime.parser.Token;
import org.apache.velocity.runtime.parser.node.SimpleNode;

import codemirror.lint.LintHandler;
import codemirror.lint.LintProcessor;

public class VelocityLintProcessor implements LintProcessor {

	private final VelocityEngine ve;

	public VelocityLintProcessor() {
		this.ve = new VelocityEngine();
		ve.init();
	}

	public String getMode() {
		return "velocity";
	}

	public void lint(String code, LintHandler handler, Object context) {
		Reader reader = new StringReader(code);
		try {
			String name = "xxx";
			RuntimeInstance runtime = new RuntimeInstance();
			SimpleNode root = runtime.parse(reader, name);

			// Create tree model
			NodeVisitor visitor = new NodeVisitor(name);
			root.jjtAccept(visitor, null);
		} catch (ParseException e) {
			Token token = e.currentToken;
			if (token != null) {
				int startLine = token.beginLine - 1;
				int startChar = token.beginColumn;
				int endLine = token.endLine - 1;
				int endChar = token.endColumn;
				String message = e.getMessage();
				handler.addAnnotation(startLine, startChar, endLine, endChar,
						message);

			}
		}
	}
}
