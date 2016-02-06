package net.lipecki.training.mybooks.exceptions;

/**
 * @author glipecki
 */
public class ResourceNotFoundException extends RuntimeException {

	private static final long serialVersionUID = -8361898854780568732L;

	public ResourceNotFoundException(String cause) {
		super(cause);
	}

}
