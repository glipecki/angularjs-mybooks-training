package net.lipecki.training.mybooks.builder;

/**
 * Can't instantionate builder exception.
 *
 * @author glipecki
 */
public class CantInstantionatePojoBuilderException extends IllegalArgumentException {

	private static final long serialVersionUID = -7081207809511566600L;

	public CantInstantionatePojoBuilderException(final Throwable cause) {
		super("Can't instationate object for builder", cause);
	}

}
