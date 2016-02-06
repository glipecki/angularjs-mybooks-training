package net.lipecki.training.mybooks.book;

import net.lipecki.training.mybooks.author.Author;
import net.lipecki.training.mybooks.builder.Builder;
import net.lipecki.training.mybooks.builder.PojoBuilder;
import net.lipecki.training.mybooks.category.Category;
import net.lipecki.training.mybooks.series.Series;

import java.util.List;

/**
 * @author glipecki
 */
public class BookBuilder extends PojoBuilder<Book, BookBuilder> {

	public static BookBuilder bookBuilder() {
		return new BookBuilder();
	}

	public BookBuilder id(Long id) {
		return instance((book) -> book.setId(id));
	}

	public BookBuilder name(String name) {
		return instance((book) -> book.setName(name));
	}

	public BookBuilder isbn(String isbn) {
		return instance((book) -> book.setIsbn(isbn));
	}

	public BookBuilder author(Author author) {
		return instance((book) -> book.setAuthor(author));
	}

	public BookBuilder series(Series series) {
		return instance((book) -> book.setSeries(series));
	}

	public BookBuilder categories(List<Category> categories) {
		return instance((book) -> book.setCategories(categories));
	}

}
