package net.lipecki.training.mybooks;

import net.lipecki.training.mybooks.author.Author;
import net.lipecki.training.mybooks.book.Book;
import net.lipecki.training.mybooks.book.EditBookService;
import net.lipecki.training.mybooks.category.Category;
import net.lipecki.training.mybooks.series.Series;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;

/**
 * @author glipecki
 */
@SpringBootApplication
public class MyBooksApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(MyBooksApplication.class, args);
	}

	@PostConstruct
	public void fillWithTestData() {

		Category fantasy = new Category(0L, "Fantastyka");
		Category sciFi = new Category(0L, "Sci-Fi");
		Category horror = new Category(0L, "Horror");

		final Book book = new Book();
		book.setName("Bohaterowie umierają");
		book.setIsbn("9788374801393");
		book.setAuthor(new Author(0L, "Matthew Woodring Stover"));
		book.setSeries(new Series(0L, "Akty Caine'a"));
		book.getCategories().add(fantasy);
		editBookService.addBook(book);

		final Book book2 = new Book();
		book2.setName("Mars atakuje");
		book2.setIsbn("9788366601393");
		book2.setAuthor(new Author(0L, "Zenon Zielonooki"));
		book2.setSeries(new Series(0L, "Zdrada marsa"));
		book2.getCategories().add(sciFi);
		editBookService.addBook(book2);

		final Book book3 = new Book();
		book3.setName("Szkielek zewnętrzny Franklina");
		book3.setIsbn("9788251601393");
		book3.setAuthor(new Author(0L, "Żółw Żółwiasty"));
		book3.setSeries(new Series(0L, "Franklin i przyjaciele"));
		book3.getCategories().add(horror);
		editBookService.addBook(book3);
	}

	@Autowired
	private EditBookService editBookService;

}
