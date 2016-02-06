package net.lipecki.training.mybooks.book;

import net.lipecki.training.mybooks.author.AuthorMapper;
import net.lipecki.training.mybooks.category.CategoryMapper;
import net.lipecki.training.mybooks.series.SeriesMapper;

/**
 * @author glipecki
 */
public class BookMapper {

	public static Book asDto(BookEntity entity) {
		if (entity != null) {
			return BookBuilder
					.bookBuilder()
					.id(entity.getId())
					.name(entity.getName())
					.isbn(entity.getIsbn())
					.author(AuthorMapper.asDto(entity.getAuthor()))
					.series(SeriesMapper.asDto(entity.getSeries()))
					.categories(CategoryMapper.asDto(entity.getCategories()))
					.build();
		} else {
			return null;
		}
	}

}
