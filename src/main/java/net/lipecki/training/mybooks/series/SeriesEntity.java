package net.lipecki.training.mybooks.series;

import javax.persistence.*;

/**
 * @author glipecki
 */
@Table(name = "series")
@Entity
public class SeriesEntity {

	@Id
	@GeneratedValue
	private Long id;

	@Column(nullable = false)
	private String name;

	public static SeriesEntity of(String name) {
		final SeriesEntity entity = new SeriesEntity();
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
		final StringBuffer sb = new StringBuffer("SeriesEntity{");
		sb.append("id=").append(id);
		sb.append(", name='").append(name).append('\'');
		sb.append('}');
		return sb.toString();
	}

}
