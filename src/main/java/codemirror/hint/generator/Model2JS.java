package codemirror.hint.generator;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class Model2JS {

	private final List<File> files;

	public Model2JS() {
		this.files = new ArrayList<File>();
	}

	public void addFile(File file) {
		this.files.add(file);
	}
	
	public List<File> getFiles() {
		return files;
	}
}
