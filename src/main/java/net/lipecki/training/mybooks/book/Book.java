package net.lipecki.training.mybooks.book;

import io.swagger.annotations.ApiModelProperty;
import net.lipecki.training.mybooks.author.Author;
import net.lipecki.training.mybooks.category.Category;
import net.lipecki.training.mybooks.series.Series;

import java.util.ArrayList;
import java.util.List;

/**
 * @author glipecki
 */
public class Book {

	@ApiModelProperty(value = "Books author", required = true, readOnly = false)
	private Author author;

	@ApiModelProperty(value = "Books series", required = false, readOnly = false)
	private Series series;

	@ApiModelProperty(value = "Books categories", required = false, readOnly = false)
	private List<Category> categories = new ArrayList<>();

	@ApiModelProperty(value = "Internal book id", example = "0", required = false, readOnly = true)
	private Long id;

	@ApiModelProperty(value = "Books name", example = "Lśnienie", required = true, readOnly = false)
	private String name;

	@ApiModelProperty(value = "Books ISBN number", example = "8320713404", required = true, readOnly = false)
	private String isbn;

	public Author getAuthor() {
		return author;
	}

	public void setAuthor(Author author) {
		this.author = author;
	}

	public Series getSeries() {
		return series;
	}

	public void setSeries(Series series) {
		this.series = series;
	}

	public List<Category> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
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
}
