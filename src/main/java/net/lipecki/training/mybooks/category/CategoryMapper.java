package net.lipecki.training.mybooks.category;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author glipecki
 */
public class CategoryMapper {

	public static Category asDto(CategoryEntity entity) {
		if (entity != null) {
			return new Category(entity.getId(), entity.getName());
		} else {
			return null;
		}
	}

	public static List<Category> asDto(List<CategoryEntity> categories) {
		if (categories != null) {
			return categories.stream().map(CategoryMapper::asDto).collect(Collectors.toList());
		} else {
			return null;
		}
	}
}
