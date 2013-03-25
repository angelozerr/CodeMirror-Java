package codemirror.executor;

import java.io.OutputStream;

public interface ExecutorProcessor {

	String getMode();

	void execute(String code, Object context, OutputStream out)
			throws Exception;

}
