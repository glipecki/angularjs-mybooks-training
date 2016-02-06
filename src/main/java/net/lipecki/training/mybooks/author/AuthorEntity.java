package net.lipecki.training.mybooks.author;

import javax.persistence.*;

/**
 * @author glipecki
 */
@Table(name = "authors")
@Entity
public class AuthorEntity {

	@Id
	@GeneratedValue
	private Long id;

	@Column(nullable = false)
	private String name;

	public static AuthorEntity of(final String name) {
		AuthorEntity entity = new AuthorEntity();
		entity.setName(name);
		return entity;
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

	@Override
	public String toString() {
		final StringBuffer sb = new StringBuffer("AuthorEntity{");
		sb.append("id=").append(id);
		sb.append(", name='").append(name).append('\'');
		sb.append('}');
		return sb.toString();
	}

}
