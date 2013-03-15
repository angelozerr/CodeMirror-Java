package codemirror.lint;

import java.util.List;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/lint")
public class LintService {

	@POST
	@Path("/annotations")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Annotation> getAnnotations(@FormParam("mode") String mode,
			@FormParam("code") String code) {
		LintProcessor processor = LintProcessorRegistry.getRegistry()
				.getLintProcessor(mode);
		BeanLintHandler handler = new BeanLintHandler();
		processor.lint(code, handler, null);
		return handler.getAnnotations();
	}
}
