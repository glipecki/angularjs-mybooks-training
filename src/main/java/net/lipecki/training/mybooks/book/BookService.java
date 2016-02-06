package net.lipecki.training.mybooks.book;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * @author glipecki
 */
public class BookService {

	private static final Logger LOG = LoggerFactory.getLogger(BookService.class);

	private final BookRepository bookRepository;

	public BookService(BookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}

	public List<BookEntity> getAll() {
		return new ArrayList<>(bookRepository.findAll());
	}

	public Optional<BookEntity> getBook(Long bookId) {
		return Optional.ofNullable(bookRepository.findOne(bookId));
	}

	public BookEntity updateBook(Long bookId, BookEntity bookEntity) {
		// check if exist and update?
		return null;
	}

	public BookEntity addBook(String name, String isbn) {
		return bookRepository.save(BookEntity.of(name, isbn));
	}

}
