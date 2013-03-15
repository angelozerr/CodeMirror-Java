package codemirror.lint;

import java.util.ArrayList;
import java.util.List;

public class BeanLintHandler implements LintHandler {

	private final List<Annotation> annotations;
	
	public BeanLintHandler() {
		this.annotations = new ArrayList<Annotation>();
	}
	
	public void addAnnotation(int startLine, int startChar, int endLine,
			int endChar, String message) {
		annotations.add(new Annotation(startLine, startChar, endLine, endChar, message));
	}

	public List<Annotation> getAnnotations() {
		return annotations;
	}

}
