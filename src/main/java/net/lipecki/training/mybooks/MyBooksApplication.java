package net.lipecki.training.mybooks;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import net.lipecki.training.mybooks.author.Author;
import net.lipecki.training.mybooks.author.AuthorEntity;
import net.lipecki.training.mybooks.author.AuthorService;
import net.lipecki.training.mybooks.book.Book;
import net.lipecki.training.mybooks.book.EditBookService;
import net.lipecki.training.mybooks.category.Category;
import net.lipecki.training.mybooks.category.CategoryEntity;
import net.lipecki.training.mybooks.category.CategoryService;
import net.lipecki.training.mybooks.series.Series;
import net.lipecki.training.mybooks.series.SeriesEntity;
import net.lipecki.training.mybooks.series.SeriesService;

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
		AuthorEntity addAuthor = authorService.addAuthor( "Druon Maurice");
		CategoryEntity addCategory = categoryService.addCategory("Historyczna");
		SeriesEntity addSeries = seriesService.addSeries("Królowie przeklęci");
		createBook("Król z żelaza", addAuthor.getId(), addCategory.getId(), addSeries.getId());
		createBook("Zamordowana królowa", addAuthor.getId(), addCategory.getId(), addSeries.getId());
		createBook("Trucizna królewska", addAuthor.getId(), addCategory.getId(), addSeries.getId());
		createBook("Prawo mężczyzn ", addAuthor.getId(), addCategory.getId(), addSeries.getId());
		createBook("Wilczyca z Francji", addAuthor.getId(), addCategory.getId(), addSeries.getId());
		createBook("Lew i lilie", addAuthor.getId(), addCategory.getId(), addSeries.getId());
		createBook("Kiedy król gubi kraj.", addAuthor.getId(), addCategory.getId(), addSeries.getId());
	}

	private void createBook(String title, Long authorId, Long categoryId, Long seriaId) {
		final Book book = new Book();
		book.setName(title);
		book.setIsbn("9788374801393");
		book.setAuthor(new Author(authorId, "Druon Maurice"));
		book.setSeries(new Series(seriaId, "Królowie przeklęci"));
		book.getCategories().add(new Category(categoryId, "Historyczna"));
		editBookService.addBook(book);
	}

	@Autowired
	private EditBookService editBookService;
	
	@Autowired
	private AuthorService authorService;
	
	@Autowired
	private SeriesService seriesService;
	
	@Autowired
	private CategoryService categoryService;

}
