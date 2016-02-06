package net.lipecki.training.mybooks.series;

import net.lipecki.training.mybooks.category.CategoryEntity;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * @author glipecki
 */
@Transactional
public class SeriesService {


	private final SeriesRepository seriesRepository;

	public SeriesService(SeriesRepository seriesRepository) {
		this.seriesRepository = seriesRepository;
	}

	public Optional<SeriesEntity> getSeries(Long id) {
		return Optional.ofNullable(seriesRepository.findOne(id));
	}

	public SeriesEntity addSeries(String name) {
		return seriesRepository.save(SeriesEntity.of(name));
	}

	public List<SeriesEntity> getAll() {
		return new ArrayList<>(seriesRepository.findAll());
	}

	public SeriesEntity updateSeries(Long seriesId, String name) {
		final SeriesEntity entity = getSeries(seriesId).orElseThrow(() -> new RuntimeException("Series with id=" + seriesId + " not found"));
		entity.setName(name);
		return entity;
	}
}
