package net.lipecki.training.mybooks.exceptions;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author glipecki
 */
@Configuration
public class ExceptionsConfiguration {

	@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Resource not found")
	@ExceptionHandler(ResourceNotFoundException.class)
	public void resourceNotFound() {
		// nothing more to do except setting accurate HttpStatus
	}

}
