package net.lipecki.training.mybooks.category;

import javax.persistence.*;

/**
 * @author glipecki
 */
@Table(name = "categories")
@Entity
public class CategoryEntity {

	@Id
	@GeneratedValue
	private Long id;

	@Column(nullable = false)
	private String name;

	public static CategoryEntity of(String name) {
		final CategoryEntity entity = new CategoryEntity();
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
		final StringBuffer sb = new StringBuffer("CategoryEntity{");
		sb.append("id=").append(id);
		sb.append(", name='").append(name).append('\'');
		sb.append('}');
		return sb.toString();
	}

}
