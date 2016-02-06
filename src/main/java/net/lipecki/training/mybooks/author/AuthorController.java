package net.lipecki.training.mybooks.author;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import net.lipecki.training.mybooks.book.BookMapper;
import net.lipecki.training.mybooks.exceptions.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.stream.Collectors.toList;

/**
 * @author glipecki
 */
@Api(description = "Manage author endpoint")
@RestController
@RequestMapping(value = "/api/author")
public class AuthorController {

	private final AuthorService authorService;

	public AuthorController(final AuthorService authorService) {
		this.authorService = authorService;
	}

	@ApiOperation(value = "Gets list of all authors")
	@RequestMapping(
			value = {""},
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Author> getAll() {
		return authorService.getAll().stream().map(AuthorMapper::asDto).collect(toList());
	}

	@ApiOperation(value = "Gets author details")
	@RequestMapping(
			value = "/{authorId}",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public Author getDetails(@PathVariable final Long authorId) {
		return AuthorMapper.asDto(
				authorService
						.getAuthor(authorId)
						.orElseThrow(() -> new ResourceNotFoundException("Author not found"))
		);
	}

	@ApiOperation(value = "Adds new author")
	@RequestMapping(
			value = {""},
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(value = HttpStatus.CREATED)
	public Author addAuthor(@RequestBody final Author author) {
		return AuthorMapper.asDto(authorService.addAuthor(author.getName()));
	}

	@ApiOperation(value = "Modifies existing author details")
	@RequestMapping(
			value = "/{authorId}",
			method = RequestMethod.PUT,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public Author editAuthor(@PathVariable final Long authorId, @RequestBody final Author author) {
		return AuthorMapper.asDto(authorService.updateAuthor(authorId, author.getName()));
	}

}
