package net.lipecki.training.mybooks.book;

import net.lipecki.training.mybooks.author.AuthorEntity;
import net.lipecki.training.mybooks.category.CategoryEntity;
import net.lipecki.training.mybooks.series.SeriesEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author glipecki
 */
@Table(name = "books")
@Entity
public class BookEntity {

	@Id
	@GeneratedValue
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String isbn;

	@ManyToOne
	private AuthorEntity author;

	@ManyToOne
	private SeriesEntity series;

	@ManyToMany
	private List<CategoryEntity> categories = new ArrayList<>();

	public BookEntity() {
		// JPA dependent default constructor.
	}

	public BookEntity(String name, String isbn) {
		this.name = name;
		this.isbn = isbn;
	}

	public static BookEntity of(String name, String isbn) {
		final BookEntity entity = new BookEntity();
		entity.setName(name);
		entity.setIsbn(isbn);
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

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public AuthorEntity getAuthor() {
		return author;
	}

	public void setAuthor(AuthorEntity author) {
		this.author = author;
	}

	public SeriesEntity getSeries() {
		return series;
	}

	public void setSeries(SeriesEntity series) {
		this.series = series;
	}

	public List<CategoryEntity> getCategories() {
		return categories;
	}

	public void setCategories(List<CategoryEntity> categories) {
		this.categories = categories;
	}

	@Override
	public String toString() {
		final StringBuffer sb = new StringBuffer("BookEntity{");
		sb.append("id=").append(id);
		sb.append(", name='").append(name).append('\'');
		sb.append('}');
		return sb.toString();
	}

	public void addCategory(CategoryEntity categoryEntity) {
		categories.add(categoryEntity);
	}

}
