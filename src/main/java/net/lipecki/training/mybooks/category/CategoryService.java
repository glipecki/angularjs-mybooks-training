package net.lipecki.training.mybooks.category;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * @author glipecki
 */
@Transactional
public class CategoryService {

	private final CategoryRepository categoryRepository;

	public CategoryService(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	public Optional<CategoryEntity> getCategory(Long id) {
		return Optional.ofNullable(categoryRepository.findOne(id));
	}

	public CategoryEntity addCategory(String name) {
		return categoryRepository.save(CategoryEntity.of(name));
	}

	public List<CategoryEntity> getAll() {
		return new ArrayList<>(categoryRepository.findAll());
	}

	public CategoryEntity updateCategory(Long categoryId, String name) {
		final CategoryEntity entity = getCategory(categoryId).orElseThrow(() -> new RuntimeException("Category with id=" + categoryId + " not found"));
		entity.setName(name);
		return entity;
	}

}
