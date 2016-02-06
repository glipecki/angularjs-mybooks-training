package net.lipecki.training.mybooks.series;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import net.lipecki.training.mybooks.book.BookMapper;
import net.lipecki.training.mybooks.category.Category;
import net.lipecki.training.mybooks.category.CategoryMapper;
import net.lipecki.training.mybooks.category.CategoryService;
import net.lipecki.training.mybooks.exceptions.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.stream.Collectors.toList;

/**
 * @author glipecki
 */
@Api(description = "Manage series endpoint")
@RestController
@RequestMapping(value = "/api/series")
public class SeriesController {

	private final SeriesService seriesService;

	public SeriesController(final SeriesService seriesService) {
		this.seriesService = seriesService;
	}

	@ApiOperation(value = "Gets list of all series")
	@RequestMapping(
			value = {""},
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Series> getAll() {
		return seriesService.getAll()
				.stream()
				.map(SeriesMapper::asDto)
				.collect(toList());
	}

	@ApiOperation(value = "Gets series details")
	@RequestMapping(
			value = "/{seriesId}",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public Series getDetails(@PathVariable final Long seriesId) {
		return SeriesMapper.asDto(
				seriesService
						.getSeries(seriesId)
						.orElseThrow(() -> new ResourceNotFoundException("Series not found"))
		);
	}

	@ApiOperation(value = "Adds new series")
	@RequestMapping(
			value = {""},
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(value = HttpStatus.CREATED)
	public Series addCategory(@RequestBody final Series series) {
		return SeriesMapper.asDto(seriesService.addSeries(series.getName()));
	}

	@ApiOperation(value = "Modifies existing series details")
	@RequestMapping(
			value = "/{seriesId}",
			method = RequestMethod.PUT,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public Series editCategory(@PathVariable final Long seriesId, @RequestBody final Series series) {
		return SeriesMapper.asDto(seriesService.updateSeries(seriesId, series.getName()));
	}

}
