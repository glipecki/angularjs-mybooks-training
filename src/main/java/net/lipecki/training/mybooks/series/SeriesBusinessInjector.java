package net.lipecki.training.mybooks.series;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author glipecki
 */
@Configuration
public class SeriesBusinessInjector {

	@Autowired
	private SeriesRepository seriesRepository;

	@Bean
	public SeriesService seriesService() {
		return new SeriesService(seriesRepository);
	}

	@Bean
	public SeriesController seriesController() {
		return new SeriesController(seriesService());
	}

}
