package codemirror.executor;

import java.util.HashMap;
import java.util.Map;

public class ExecutorProcessorRegistry {

	private static final ExecutorProcessorRegistry INSTANCE = new ExecutorProcessorRegistry();
	private final Map<String, ExecutorProcessor> processors;

	public static ExecutorProcessorRegistry getRegistry() {
		return INSTANCE;
	}

	public ExecutorProcessorRegistry() {
		this.processors = new HashMap<String, ExecutorProcessor>();


	}

	public ExecutorProcessor getExecutorProcessor(String mode) {
		return processors.get(mode);
	}

	public void register(ExecutorProcessor processor) {
		processors.put(processor.getMode(), processor);
	}

	public void unegister(ExecutorProcessor processor) {
		processors.remove(processor.getMode());
	}

}
