package net.lipecki.training.mybooks.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author glipecki
 */
@Configuration
public class CategoryBusinessInjector {

	@Autowired
	private CategoryRepository categoryRepository;

	@Bean
	public CategoryService categoryService() {
		return new CategoryService(categoryRepository);
	}

	@Bean
	public CategoryController categoryController() {
		return new CategoryController(categoryService());
	}

}
