package codemirror.hint.generator.templates.eclipse;

import java.util.Properties;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import codemirror.hint.generator.templates.TemplatesHandler;

public class EclipseTemplate2JSHandler extends DefaultHandler {

	private final TemplatesHandler handler;
	private final Properties properties;
	private final String name;
	private final String context;

	private String templateName;
	private String templateDescription;
	private final StringBuilder template;

	public EclipseTemplate2JSHandler(String name, String context,
			TemplatesHandler handler, Properties properties) {
		this.handler = handler;
		this.properties = properties;
		this.name = name;
		this.context = context;
		this.templateName = null;
		this.templateDescription = null;
		this.template = new StringBuilder();
	}

	@Override
	public void startDocument() throws SAXException {
		try {
			handler.startTemplates(name, context);
		} catch (Exception e) {
			throw new SAXException(e);
		}
		super.startDocument();
	}

	@Override
	public void startElement(String uri, String localName, String name,
			Attributes attributes) throws SAXException {
		if ("template".equals(name)) {
			templateName = attributes.getValue("name");
			templateDescription = attributes.getValue("description");
			if (templateDescription != null && templateDescription.length() > 0) {
				if (templateDescription.startsWith("%")) {
					String description = templateDescription.substring(1,
							templateDescription.length());
					description = (String) properties.get(description);
					if (description != null && description.length() > 0) {
						templateDescription = description;
					}
				}

			}
		}
		super.startElement(uri, localName, name, attributes);
	}

	@Override
	public void endElement(String uri, String localName, String name)
			throws SAXException {
		try {
			if ("template".equals(name)) {
				handler.addTemplate(templateName, templateDescription,
						template.toString());
				templateName = null;
				templateDescription = null;
				template.setLength(0);
			}

		} catch (Exception e) {
			throw new SAXException(e);
		}
		super.endElement(uri, localName, name);
	}

	@Override
	public void endDocument() throws SAXException {
		try {
			handler.endTemplates();
		} catch (Exception e) {
			throw new SAXException(e);
		}
		super.endDocument();
	}

	@Override
	public void characters(char[] ch, int start, int length)
			throws SAXException {
		if (templateName != null) {
			String s = String.valueOf(ch, start, length);
			s = String.valueOf(ch, start, length);
			template.append(s);
		}
		super.characters(ch, start, length);
	}

}
