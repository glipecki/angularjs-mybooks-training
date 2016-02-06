package net.lipecki.training.mybooks.series;

/**
 * @author glipecki
 */
public class SeriesMapper {

	public static Series asDto(SeriesEntity entity) {
		if (entity != null) {
			return new Series(entity.getId(), entity.getName());
		} else {
			return null;
		}
	}

}
