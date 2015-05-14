package codemirror.lint;

import java.util.HashMap;
import java.util.Map;

import codemirror.lint.velocity.VelocityLintProcessor;

public class LintProcessorRegistry {

	private static final LintProcessorRegistry INSTANCE = new LintProcessorRegistry();
	private final Map<String, LintProcessor> processors;

	public static LintProcessorRegistry getRegistry() {
		return INSTANCE;
	}

	public LintProcessorRegistry() {
		this.processors = new HashMap<String, LintProcessor>();
		
		// should use SPI to register processor
		register(new VelocityLintProcessor());
		
	}

	public LintProcessor getLintProcessor(String mode) {
		return processors.get(mode);
	}
	
	public void register(LintProcessor processor) {
		processors.put(processor.getMode(), processor);
	}
	
	public void unegister(LintProcessor processor) {
		processors.remove(processor.getMode());
	}
	
}
