package codemirror.hint.generator.declaredfunctions;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import org.xml.sax.SAXException;
import org.xml.sax.helpers.AttributesImpl;

import codemirror.hint.generator.XMLModule2JsonHandler;

public class DeclaredFunctions2JS {

	private final List<File> files;

	private class Parameter {
		public String name;
		public String type;
	}

	public DeclaredFunctions2JS() {
		this.files = new ArrayList<File>();
	}

	public void addFile(File file) {
		this.files.add(file);
	}

	public static void main(String[] args) {

		DeclaredFunctions2JS functions2js = new DeclaredFunctions2JS();
		functions2js.addFile(new File("src/main/resources/modules/MarkLogic"));

		try {
			functions2js.generate(new File("target/modules/MarkLogic"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public void generate(File outBaseDir) throws Exception {
		for (File file : files) {
			generate(file, file, outBaseDir);
		}
	}

	public void generate(File file, File inBaseDir, File outBaseDir)
			throws SAXException, IOException {
		if (file.isDirectory()) {
			File[] dirs = file.listFiles();
			for (int i = 0; i < dirs.length; i++) {
				generate(dirs[i], inBaseDir, outBaseDir);
			}

		} else {
			System.out.println("==============>" + file.getPath());
			Writer writer = null;
			XMLModule2JsonHandler handler = null;

			BufferedReader bufferedReader = null;
			try {

				// search line which declares module : module namespace
				// xqe="http://marklogic.com/xqe";
				String modulePrefix = null;
				String moduleNamespace = null;
				// Construct the BufferedReader object
				bufferedReader = new BufferedReader(new FileReader(file));

				String line = null;

				String path = file.getPath();
				path = path.substring(inBaseDir.getPath().length() + 1,
						path.length())
						+ ".js";

				try {
					while ((line = bufferedReader.readLine()) != null) {
						if (modulePrefix == null && moduleNamespace == null) {
							if (line.startsWith("module namespace ")) {
								String afterNamespace = line.substring(
										"module namespace ".length(),
										line.length());
								int index = afterNamespace.indexOf("=");
								if (index != -1) {
									modulePrefix = afterNamespace.substring(0,
											index).trim();
									moduleNamespace = afterNamespace
											.substring(index + 2);
									index = moduleNamespace.indexOf("\"");
									moduleNamespace = moduleNamespace
											.substring(0, index);
								}

								if (modulePrefix != null
										&& moduleNamespace != null) {

									File outFile = new File(outBaseDir, path);
									outFile.getParentFile().mkdirs();
									writer = new FileWriter(outFile);

									handler = new XMLModule2JsonHandler(writer,
											null);
									AttributesImpl moduleAttributes = new AttributesImpl();
									moduleAttributes
											.addAttribute(
													"",
													XMLModule2JsonHandler.MODULE_PREFIX_ATTR,
													XMLModule2JsonHandler.MODULE_PREFIX_ATTR,
													"CDATA", modulePrefix);

									moduleAttributes
											.addAttribute(
													"",
													XMLModule2JsonHandler.MODULE_NAMESPACE_URI_ATTR,
													XMLModule2JsonHandler.MODULE_NAMESPACE_URI_ATTR,
													"CDATA", moduleNamespace);
									handler.startElement("",
											XMLModule2JsonHandler.MODULE_ELT,
											XMLModule2JsonHandler.MODULE_ELT,
											moduleAttributes);
								}
							}
						} else {
							if (handler != null) {
								// Add declare function
								// declare function xdmp:access($uri as
								// xs:string, $action as xs:string) as
								// xs:boolean external;
								String returnType = null;
								boolean searchReturnType = false;
								String beforeFunction = "declare function "
										+ modulePrefix + ":";
								if (line.startsWith(beforeFunction)) {
									String afterFunction = line.substring(
											beforeFunction.length(),
											line.length());
									int index = afterFunction.indexOf("(");
									String funcName = afterFunction.substring(
											0, index);

									AttributesImpl functionAttributes = new AttributesImpl();
									functionAttributes
											.addAttribute(
													"",
													XMLModule2JsonHandler.FUNCTION_NAME_ATTR,
													XMLModule2JsonHandler.FUNCTION_NAME_ATTR,
													"CDATA", funcName);

									String afterFunctionName = afterFunction
											.substring(funcName.length(),
													afterFunction.length());
									char[] chars = afterFunctionName
											.toCharArray();

									List<Parameter> parameters = new ArrayList<DeclaredFunctions2JS.Parameter>();

									char c = 0;
									int bracket = 0;
									Parameter parameter = null;
									StringBuilder buffer = new StringBuilder();
									for (int i = 0; i < chars.length; i++) {
										c = chars[i];
										switch (c) {
										case '(':
											if (bracket > 0 || searchReturnType) {
												buffer.append(c);
											}
											if (!searchReturnType)
												bracket++;
											break;
										case ')':
											if (!searchReturnType)
												bracket--;
											if (bracket > 0 || searchReturnType) {
												buffer.append(c);
											} else {
												if (parameter != null) {
													parameter.type = buffer
															.toString();
													buffer.setLength(0);
													parameter = null;
												}
											}
											break;
										case ' ':
											if (bracket > 0) {
												if (parameter == null) {
													if (buffer.length() > 0) {
														parameter = new Parameter();
														parameter.name = buffer
																.toString();
														if (parameter.name
																.startsWith("$")) {
															parameter.name = parameter.name
																	.substring(
																			1,
																			parameter.name
																					.length());
														}
														parameters
																.add(parameter);
														buffer.setLength(0);
													}
												} else {
													if (buffer.toString()
															.equals("as")) {
														buffer.setLength(0);
													} else {
														buffer.append(c);
													}
												}
											} else {
												if (buffer.toString().equals(
														"as")) {
													buffer.setLength(0);
													searchReturnType = true;
												} else if (searchReturnType) {
													returnType = buffer
															.toString();
													break;
												}
											}
											break;
										case ',':
											if (parameter != null) {
												parameter.type = buffer
														.toString();
												buffer.setLength(0);
												parameter = null;
											}
											break;
										default:
											buffer.append(c);
										}
									}

									// String parameters =
									// afterFunction.substring(funcName.length()+1,
									// index);

									// String functionAs =
									// getAs(method.returnType());
									if (returnType != null) {
										functionAttributes.addAttribute("",
												XMLModule2JsonHandler.AS_ATTR, XMLModule2JsonHandler.AS_ATTR, "CDATA",
												returnType);
									}
									handler.startElement("",
											XMLModule2JsonHandler.FUNCTION_ELT,
											XMLModule2JsonHandler.FUNCTION_ELT,
											functionAttributes);

									// Loop for Parameters
									for (Parameter p : parameters) {
										AttributesImpl paramAttributes = new AttributesImpl();
										paramAttributes
												.addAttribute(
														"",
														XMLModule2JsonHandler.FUNCTION_PARAM_NAME_ATTR,
														XMLModule2JsonHandler.FUNCTION_PARAM_NAME_ATTR,
														"CDATA", p.name);
										paramAttributes.addAttribute("",
												XMLModule2JsonHandler.AS_ATTR,
												XMLModule2JsonHandler.AS_ATTR,
												"CDATA", p.type);
										handler.startElement(
												"",
												XMLModule2JsonHandler.FUNCTION_PARAM_ELT,
												XMLModule2JsonHandler.FUNCTION_PARAM_ELT,
												paramAttributes);
										handler.endElement(
												"",
												XMLModule2JsonHandler.FUNCTION_PARAM_ELT,
												XMLModule2JsonHandler.FUNCTION_PARAM_ELT);
									}

									// Parameter parameter = null;
									// Parameter[] parameters =
									// method.parameters();
									// for (int k = 0; k < parameters.length;
									// k++) {
									// parameter = parameters[k];
									// AttributesImpl paramAttributes = new
									// AttributesImpl();
									// paramAttributes.addAttribute("",
									// FUNCTION_PARAM_NAME_ATTR,
									// FUNCTION_PARAM_NAME_ATTR, "CDATA",
									// parameter.name());
									// paramAttributes.addAttribute("", AS_ATTR,
									// AS_ATTR, "CDATA",
									// getAs(parameter.type()));
									// handler.startElement("",
									// FUNCTION_PARAM_ELT, FUNCTION_PARAM_ELT,
									// paramAttributes);
									// handler.endElement("",
									// FUNCTION_PARAM_ELT, FUNCTION_PARAM_ELT);
									// }

									handler.endElement("",
											XMLModule2JsonHandler.FUNCTION_ELT,
											XMLModule2JsonHandler.FUNCTION_ELT);

								}

							}
						}
						// Process the data, here we just print it out
						// System.out.println(line);
					}

				} catch (FileNotFoundException ex) {
					ex.printStackTrace();
				} catch (IOException ex) {
					ex.printStackTrace();
				} finally {
					// Close the BufferedReader
					try {
						if (bufferedReader != null)
							bufferedReader.close();
					} catch (IOException ex) {
						ex.printStackTrace();
					}
				}
			} finally {
				if (writer != null) {

					handler.endElement("", XMLModule2JsonHandler.MODULE_ELT,
							XMLModule2JsonHandler.MODULE_ELT);

					writer.flush();
					writer.close();
				}
			}
		}
	}
}
