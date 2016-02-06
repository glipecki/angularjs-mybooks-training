package net.lipecki.training.mybooks.book;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import net.lipecki.training.mybooks.exceptions.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

import static java.util.stream.Collectors.toList;

/**
 * @author glipecki
 */
@Api(description = "Manage books endpoint")
@RestController
@RequestMapping(value = "/api/books")
public class BookController {

	private final BookService bookService;

	private final EditBookService editBookService;

	public BookController(BookService bookService, EditBookService addBookService) {
		this.bookService = bookService;
		this.editBookService = addBookService;
	}

	@ApiOperation(value = "Gets list of all book")
	@RequestMapping(
			value = {""},
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Book> getAll() {
		return bookService.getAll()
				.stream()
				.map(BookMapper::asDto)
				.collect(toList());
	}

	@ApiOperation(value = "Gets book details")
	@RequestMapping(
			value = "/{bookId}",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public Book getDetails(@PathVariable final Long bookId) {
		return BookMapper.asDto(
				bookService
						.getBook(bookId)
						.orElseThrow(() -> new ResourceNotFoundException("Book not found"))
		);
	}

	@ApiOperation(value = "Adds new book")
	@RequestMapping(
			value = {""},
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(value = HttpStatus.CREATED)
	public Book addBook(@RequestBody final Book book) {
		return BookMapper.asDto(editBookService.addBook(book));
	}

	@ApiOperation(value = "Modifies existing book details")
	@RequestMapping(
			value = "/{bookId}",
			method = RequestMethod.PUT,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public Book editBook(@PathVariable final Long bookId, @RequestBody final Book book) {
		return BookMapper.asDto(editBookService.updateBook(bookId, book));
	}

}
