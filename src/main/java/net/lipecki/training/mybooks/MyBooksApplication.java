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
		final Book book = new Book();
		book.setName("Bohaterowie umierają");
		book.setIsbn("9788374801393");
		book.setAuthor(new Author(0L, "Matthew Woodring Stover"));
		book.setSeries(new Series(0L, "Akty Caine'a"));
		book.getCategories().add(new Category(0L, "Fantastyka"));
		editBookService.addBook(book);
	}

	@Autowired
	private EditBookService editBookService;

}
