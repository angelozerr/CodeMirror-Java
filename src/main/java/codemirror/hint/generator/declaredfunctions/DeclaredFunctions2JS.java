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

import codemirror.hint.generator.CodeMirrorModuleHandler;
import codemirror.hint.generator.Function;
import codemirror.hint.generator.ModuleHandler;
import codemirror.hint.generator.xmlmodules.XMLModule2JsonHandler;

public class DeclaredFunctions2JS {

  private final List<File> files;

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

    functions2js = new DeclaredFunctions2JS();
    functions2js.addFile(new File("src/main/resources/modules/xhive"));

    try {
      functions2js.generate(new File("target/modules/xhive"));
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

  public void generate(File file, File inBaseDir, File outBaseDir) throws Exception {
    if (file.isDirectory()) {
      File[] dirs = file.listFiles();
      for (int i = 0; i < dirs.length; i++) {
        generate(dirs[i], inBaseDir, outBaseDir);
      }

    } else {
      System.out.println("==============>" + file.getPath());
      Writer writer = null;
      ModuleHandler handler = null;

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
        path = path.substring(inBaseDir.getPath().length() + 1, path.length()) + ".js";

        try {
          while ((line = bufferedReader.readLine()) != null) {
            if (modulePrefix == null && moduleNamespace == null) {
              if (line.startsWith("module namespace ")) {
                String afterNamespace = line.substring("module namespace ".length(), line.length());
                int index = afterNamespace.indexOf("=");
                if (index != -1) {
                  modulePrefix = afterNamespace.substring(0, index).trim();
                  moduleNamespace = afterNamespace.substring(index + 2);
                  index = moduleNamespace.indexOf("\"");
                  moduleNamespace = moduleNamespace.substring(0, index);
                }

                if (modulePrefix != null && moduleNamespace != null) {

                  File outFile = new File(outBaseDir, path);
                  outFile.getParentFile().mkdirs();
                  writer = new FileWriter(outFile);

                  handler = new CodeMirrorModuleHandler(writer);
                  handler.startModule(modulePrefix, moduleNamespace, null);
                }
              }
            } else {
              if (handler != null) {
                // Add declare function
                // declare function xdmp:access($uri as
                // xs:string, $action as xs:string) as
                // xs:boolean external;

                String beforeFunction = "declare function " + modulePrefix + ":";
                if (line.startsWith(beforeFunction)) {
                  String afterFunction = line.substring(beforeFunction.length(), line.length());
                  Function.parse(afterFunction, null, handler);
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

          handler.endModule();

          writer.flush();
          writer.close();
        }
      }
    }
  }
}
