package net.lipecki.training.mybooks.book;

import net.lipecki.training.mybooks.author.Author;
import net.lipecki.training.mybooks.author.AuthorEntity;
import net.lipecki.training.mybooks.author.AuthorService;
import net.lipecki.training.mybooks.category.Category;
import net.lipecki.training.mybooks.category.CategoryEntity;
import net.lipecki.training.mybooks.category.CategoryService;
import net.lipecki.training.mybooks.series.Series;
import net.lipecki.training.mybooks.series.SeriesEntity;
import net.lipecki.training.mybooks.series.SeriesService;

import javax.transaction.Transactional;
import java.util.ArrayList;

/**
 * @author glipecki
 */
@Transactional
public class EditBookService {

	private final BookService bookService;

	private final AuthorService authorService;

	private final SeriesService seriesService;

	private final CategoryService categoryService;

	public EditBookService(
			final BookService bookService,
			final AuthorService authorService,
			final SeriesService seriesService,
			final CategoryService categoryService) {
		this.bookService = bookService;
		this.authorService = authorService;
		this.seriesService = seriesService;
		this.categoryService = categoryService;
	}

	public BookEntity addBook(Book bookDto) {
		final BookEntity book = bookService.addBook(bookDto.getName(), bookDto.getIsbn());

		book.setAuthor(getOrCreateAuthor(bookDto.getAuthor()));
		if (bookDto.getSeries() != null) {
			book.setSeries(getOrCreateSeries(bookDto.getSeries()));
		}
		if (bookDto.getCategories() != null) {
			for (final Category category : bookDto.getCategories()) {
				book.addCategory(getOrCreateCategory(category));
			}
		}

		return book;
	}

	private AuthorEntity getOrCreateAuthor(Author author) {
		if (author.hasId()) {
			return authorService.getAuthor(author.getId()).get();
		} else {
			return authorService.addAuthor(author.getName());
		}
	}

	private SeriesEntity getOrCreateSeries(Series series) {
		if (series.hasId()) {
			return seriesService.getSeries(series.getId()).get();
		} else {
			return seriesService.addSeries(series.getName());
		}
	}

	private CategoryEntity getOrCreateCategory(Category category) {
		if (category.hasId()) {
			return categoryService.getCategory(category.getId()).get();
		} else {
			return categoryService.addCategory(category.getName());
		}
	}

	public BookEntity updateBook(Long bookId, Book book) {
		final BookEntity bookEntity = bookService.getBook(bookId).orElseThrow(() -> new RuntimeException("Book with id=" + bookId + " is not found"));
		bookEntity.setName(book.getName());
		bookEntity.setIsbn(book.getIsbn());
		bookEntity.setAuthor(getOrCreateAuthor(book.getAuthor()));
		if (book.getSeries() != null) {
			bookEntity.setSeries(getOrCreateSeries(book.getSeries()));
		} else {
			bookEntity.setSeries(null);
		}
		bookEntity.setCategories(new ArrayList<>());
		if (book.getCategories() != null) {
			for (final Category category : book.getCategories()) {
				bookEntity.addCategory(getOrCreateCategory(category));
			}
		}
		return bookEntity;
	}

}
