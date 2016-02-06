package net.lipecki.training.mybooks.book;

import net.lipecki.training.mybooks.author.AuthorBusinessInjector;
import net.lipecki.training.mybooks.category.CategoryBusinessInjector;
import net.lipecki.training.mybooks.series.SeriesBusinessInjector;
import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.sql.SQLException;

/**
 * @author glipecki
 */
@Configuration
public class BookBusinessInjector {

	@Autowired
	private BookRepository bookRepository;

	@Autowired
	private AuthorBusinessInjector authorBusinessInjector;

	@Autowired
	private SeriesBusinessInjector seriesBusinessInjector;

	@Autowired
	private CategoryBusinessInjector categoryBusinessInjector;

	@Bean
	public BookService bookService() {
		return new BookService(bookRepository);
	}

	@Bean
	public EditBookService editBookService() {
		return new EditBookService(
				bookService(),
				authorBusinessInjector.authorService(),
				seriesBusinessInjector.seriesService(),
				categoryBusinessInjector.categoryService());
	}

	@Bean
	public BookController bookController() {
		return new BookController(bookService(), editBookService());
	}

}
