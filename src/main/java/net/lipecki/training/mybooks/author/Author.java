package net.lipecki.training.mybooks.author;

import io.swagger.annotations.ApiModelProperty;

/**
 * @author glipecki
 */
public class Author {

	@ApiModelProperty(value = "Internal author id", example = "0", required = false, readOnly = true)
	private Long id;

	@ApiModelProperty(value = "Author name", example = "Stephen King", required = true, readOnly = false)
	private String name;

	public Author() {
	}

	public Author(Long id, String name) {
		this.id = id;
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean hasId() {
		return id != null && id > 0;
	}

	@Override
	public String toString() {
		final StringBuffer sb = new StringBuffer("Author{");
		sb.append("id=").append(id);
		sb.append(", name=").append(name);
		sb.append('}');
		return sb.toString();
	}

}
