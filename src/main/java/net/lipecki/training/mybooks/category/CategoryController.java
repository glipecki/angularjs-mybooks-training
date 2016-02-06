package net.lipecki.training.mybooks.category;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import net.lipecki.training.mybooks.author.AuthorMapper;
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
@Api(description = "Manage category endpoint")
@RestController
@RequestMapping(value = "/api/category")
public class CategoryController {

	private final CategoryService categoryService;

	public CategoryController(final CategoryService categoryService) {
		this.categoryService = categoryService;
	}

	@ApiOperation(value = "Gets list of all categories")
	@RequestMapping(
			value = {""},
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Category> getAll() {
		return categoryService.getAll()
				.stream()
				.map(CategoryMapper::asDto)
				.collect(toList());
	}

	@ApiOperation(value = "Gets category details")
	@RequestMapping(
			value = "/{categoryId}",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public Category getDetails(@PathVariable final Long categoryId) {
		return CategoryMapper.asDto(
				categoryService
						.getCategory(categoryId)
						.orElseThrow(() -> new ResourceNotFoundException("Category not found"))
		);
	}

	@ApiOperation(value = "Adds new category")
	@RequestMapping(
			value = {""},
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(value = HttpStatus.CREATED)
	public Category addCategory(@RequestBody final Category category) {
		return CategoryMapper.asDto(categoryService.addCategory(category.getName()));
	}

	@ApiOperation(value = "Modifies existing category details")
	@RequestMapping(
			value = "/{categoryId}",
			method = RequestMethod.PUT,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public Category editCategory(@PathVariable final Long categoryId, @RequestBody final Category category) {
		return CategoryMapper.asDto(categoryService.updateCategory(categoryId, category.getName()));
	}

}
