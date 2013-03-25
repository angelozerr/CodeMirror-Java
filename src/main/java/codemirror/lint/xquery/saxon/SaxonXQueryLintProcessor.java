package codemirror.lint.xquery.saxon;

import javax.xml.transform.SourceLocator;

import net.sf.saxon.s9api.Processor;
import net.sf.saxon.s9api.SaxonApiException;
import net.sf.saxon.s9api.XQueryCompiler;
import net.sf.saxon.trans.XPathException;
import codemirror.lint.LintHandler;
import codemirror.lint.xquery.AbstractXQueryLintProcessor;

public class SaxonXQueryLintProcessor extends AbstractXQueryLintProcessor {

	public void lint(String code, LintHandler handler, Object context) {
		Processor processor = new Processor(false);
		XQueryCompiler compiler = processor.newXQueryCompiler();
		try {
			compiler.compile(code);
		} catch (SaxonApiException e) {
			XPathException e1 = (XPathException) e.getCause();
			SourceLocator locator = e1.getLocator();
			int startLine = 0;
			int startChar = 0;
			int endChar = 1;
			int endLine = 0;
			if (locator != null) {
				startLine = locator.getLineNumber() - 1;
				startChar = locator.getColumnNumber();
				endChar = locator.getColumnNumber() + 1;
				endLine = locator.getLineNumber() - 1;				
			}
			String message = e1.getMessageAndLocation();
			handler.addAnnotation(startLine, startChar, endLine, endChar,
					message);
		}
	}

}
