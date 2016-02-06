package net.lipecki.training.mybooks.builder;

import java.lang.reflect.ParameterizedType;

/**
 * @param T object to build
 * @param B builder concrete type
 * @author glipecki
 */
public abstract class PojoBuilder<T, B extends PojoBuilder<T, B>> implements Builder<T> {

	private final T instance;

	@SuppressWarnings("unchecked")
	protected PojoBuilder() {
		try {
			final ParameterizedType genericSuperclass = (ParameterizedType) getClass().getGenericSuperclass();
			this.instance = ((Class<T>) genericSuperclass.getActualTypeArguments()[0]).newInstance();
		} catch (InstantiationException | IllegalAccessException e) {
			throw new CantInstantionatePojoBuilderException(e);
		}
	}

	protected PojoBuilder(final Class<T> instanceClass) {
		try {
			this.instance = instanceClass.newInstance();
		} catch (InstantiationException | IllegalAccessException e) {
			throw new CantInstantionatePojoBuilderException(e);
		}
	}

	protected PojoBuilder(final T instance) {
		this.instance = instance;
	}

	@Override
	public T build() {
		return instance;
	}

	protected T instance() {
		return instance;
	}

	protected B instance(final InstanceModificator<T> modificator) {
		modificator.modify(instance);
		return self();
	}

	@SuppressWarnings("unchecked")
	protected B self() {
		return (B) this;
	}

	public interface InstanceModificator<T> {

		void modify(T instance);

	}

}
