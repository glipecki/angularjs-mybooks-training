package net.lipecki.training.mybooks.author;

/**
 * @author glipecki
 */
public class AuthorMapper {

	public static Author asDto(AuthorEntity entity) {
		if (entity != null) {
			return new Author(entity.getId(), entity.getName());
		} else {
			return null;
		}
	}

}
