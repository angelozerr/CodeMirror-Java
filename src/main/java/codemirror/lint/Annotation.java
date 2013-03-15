package codemirror.lint;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement(name ="annotations")
@XmlType(propOrder = { "startLine", "startChar", "endLine", "endChar", "message" })
public class Annotation {

	private int startLine;
	private int startChar;
	private int endLine;
	private int endChar;
	private String message;

	public Annotation() {
	}

	public Annotation(int startLine, int startChar, int endLine, int endChar,
			String message) {
		setStartLine(startLine);
		setStartChar(startChar);
		setEndLine(endLine);
		setEndChar(endChar);
		setMessage(message);
	}

	public int getStartLine() {
		return startLine;
	}

	public void setStartLine(int startLine) {
		this.startLine = startLine;
	}

	public int getStartChar() {
		return startChar;
	}

	public void setStartChar(int startChar) {
		this.startChar = startChar;
	}

	public int getEndLine() {
		return endLine;
	}

	public void setEndLine(int endLine) {
		this.endLine = endLine;
	}

	public int getEndChar() {
		return endChar;
	}

	public void setEndChar(int endChar) {
		this.endChar = endChar;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
