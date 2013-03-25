package codemirror.executor.xquery.saxon;

import java.io.OutputStream;

import net.sf.saxon.s9api.Processor;
import net.sf.saxon.s9api.Serializer;
import net.sf.saxon.s9api.XQueryCompiler;
import net.sf.saxon.s9api.XQueryExecutable;
import codemirror.executor.ExecutorProcessor;

public class SaxonXQueryExecutorProcessor implements ExecutorProcessor {

	public String getMode() {
		return "xquery";
	}

	public void execute(String code, Object context, OutputStream out)
			throws Exception {
		Processor processor = new Processor(false);
		XQueryCompiler compiler = processor.newXQueryCompiler();

		XQueryExecutable executable = compiler.compile(code);

		Serializer serializer = new Serializer();
		serializer.setOutputProperty(Serializer.Property.METHOD, "xml");
		serializer.setOutputProperty(Serializer.Property.INDENT, "yes");
		serializer.setOutputProperty(Serializer.Property.OMIT_XML_DECLARATION,
				"yes");
		serializer.setOutputStream(out);
		executable.load().run(serializer);

	}
}
