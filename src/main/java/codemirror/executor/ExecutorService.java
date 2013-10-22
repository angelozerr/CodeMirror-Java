package codemirror.executor;

import java.io.IOException;
import java.io.OutputStream;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;

import org.apache.commons.io.IOUtils;

@Path("/execute")
public class ExecutorService {

	@POST
	@Path("/run")
	@Produces(MediaType.TEXT_PLAIN)
	public Response run( @FormParam("mode") String mode,
			final @FormParam("code") String code) {
		final ExecutorProcessor processor = ExecutorProcessorRegistry.getRegistry()
				.getExecutorProcessor(mode);
		return Response.ok(new StreamingOutput() {
			public void write(OutputStream output) throws IOException,
					WebApplicationException {
				
					try {
						processor.execute(code, null, output);
					} catch (Exception e) {
						IOUtils.write("___err", output);
						IOUtils.write(e.getMessage(), output);
					}
				
			}
		}).build();
	}
}
