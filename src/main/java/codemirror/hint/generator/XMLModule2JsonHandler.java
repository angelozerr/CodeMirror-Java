package codemirror.hint.generator;

import java.io.IOException;
import java.io.Writer;
import java.util.Properties;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import codemirror.json.JsonUtils;

public class XMLModule2JsonHandler extends DefaultHandler {

  public static final String MODULE_ELT = "XQLModule";
  public static final String MODULE_PREFIX_ATTR = "prefix";
  public static final String MODULE_NAMESPACE_URI_ATTR = "namespace-uri";
  public static final String FUNCTION_ELT = "function";
  public static final String FUNCTION_NAME_ATTR = "name";
  public static final String FUNCTION_PARAM_ELT = "param";
  public static final String FUNCTION_PARAM_NAME_ATTR = "name";
  public static final String AS_ATTR = "as";

  private final Writer writer;
  private final Properties properties;
  private boolean hasModule;
  private int nbFunctions;
  private boolean functionParsing;
  private Integer nbParams;

  public XMLModule2JsonHandler(Writer writer, Properties properties) {
    this.writer = writer;
    this.properties = properties;
    this.hasModule = false;
    this.nbFunctions = 0;
    this.functionParsing = false;
    this.nbParams = 0;
  }

  @Override
  public void startElement(String uri, String localName, String name, Attributes attributes) throws SAXException {
    try {
      if ((MODULE_ELT).equals(name)) {
        this.hasModule = true;
        this.nbFunctions = 0;
        /*
         * if (nbModules > 0) { JsonUtils.addFieldsSeparator(writer); }
         */
        writer.write("CodeMirror.defineXQueryModule(");
        JsonUtils.beginJsonObject(writer);
        String prefix = attributes.getValue(MODULE_PREFIX_ATTR);
        boolean hasPrefix = prefix != null && prefix.length() > 0;        
        if (hasPrefix) {
        	JsonUtils.addJsonField("prefix", prefix, true, true, writer);	
        }
        String namespaceURI = getValue(attributes.getValue(MODULE_NAMESPACE_URI_ATTR));
        JsonUtils.addJsonField("namespace", namespaceURI, !hasPrefix, true, writer);
        String location = getValue(attributes.getValue("location"));
        if (!(location == null || location.length() < 1)) {
          JsonUtils.addJsonField("location", location, false, true, writer);
        }
        JsonUtils.addString(",\"functions\":", false, writer);
        JsonUtils.beginJsonArray(writer);
      } else if (FUNCTION_ELT.equals(name)) {
        if (nbFunctions > 0) {
          JsonUtils.addFieldsSeparator(writer);
        }
        JsonUtils.beginJsonObject(writer);
        JsonUtils.addJsonField("name", attributes.getValue(FUNCTION_NAME_ATTR), true, true, writer);
        String as = attributes.getValue(AS_ATTR);
        if (as != null && as.length() > 0) {
          JsonUtils.addJsonField("as", as, false, true, writer);
        }
        this.nbFunctions++;
        this.functionParsing = true;
        this.nbParams = 0;
      } else if (FUNCTION_PARAM_ELT.equals(name) && functionParsing) {
        if (nbParams == 0) {
          JsonUtils.addString(",\"params\":", false, writer);
          JsonUtils.beginJsonArray(writer);
        } else {
          JsonUtils.addFieldsSeparator(writer);
        }
        JsonUtils.beginJsonObject(writer);
        JsonUtils.addJsonField(FUNCTION_PARAM_NAME_ATTR, attributes.getValue(FUNCTION_PARAM_NAME_ATTR), true, true, writer);
        JsonUtils.addJsonField(AS_ATTR, attributes.getValue(AS_ATTR), false, true, writer);
        JsonUtils.endJsonObject(writer);
        nbParams++;
      }
    } catch (IOException e) {
      throw new SAXException(e);
    }
    super.startElement(uri, localName, name, attributes);
  }

  private String getValue(String value) {
    if (properties == null) {
      return value;
    }
    int fromIndex = value.indexOf("@");
    if (fromIndex == -1) {
      return value;
    }
    int toIndex = value.indexOf("@", fromIndex + 1);
    if (toIndex == -1) {
      return value;
    }
    String token = value.substring(fromIndex + 1, toIndex);
    String newValue = (String) properties.get(token);
    if (newValue != null) {
      String afterToken = value.substring(toIndex + 1, value.length());
      return getValue(newValue + afterToken);
    }
    return value;
  }

  @Override
  public void endElement(String uri, String localName, String name) throws SAXException {
    try {
      if ((MODULE_ELT).equals(name)) {
        JsonUtils.endJsonArray(writer);
        JsonUtils.endJsonObject(writer);

        writer.write(");\n");
      } else if (FUNCTION_ELT.equals(name)) {
        if (nbParams > 0) {
          JsonUtils.endJsonArray(writer);
        }
        JsonUtils.endJsonObject(writer);
        this.functionParsing = false;
      } else if (FUNCTION_PARAM_ELT.equals(name) && functionParsing) {

      }
    } catch (IOException e) {
      throw new SAXException(e);
    }
    super.endElement(uri, localName, name);
  }

  public boolean hasModule() {
    return hasModule;
  }

}
