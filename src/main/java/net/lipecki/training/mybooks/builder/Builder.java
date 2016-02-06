package net.lipecki.training.mybooks.builder;

/**
 * Object builder.
 *
 * @author glipecki
 */
public interface Builder<T> {

	/**
	 * Gets created instance.
	 *
	 * @return
	 */
	T build();

}