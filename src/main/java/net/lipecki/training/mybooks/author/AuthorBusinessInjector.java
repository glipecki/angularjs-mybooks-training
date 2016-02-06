package net.lipecki.training.mybooks.author;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author glipecki
 */
@Configuration
public class AuthorBusinessInjector {

	@Autowired
	private AuthorRepository authorRepository;

	@Bean
	public AuthorService authorService() {
		return new AuthorService(authorRepository);
	}

	@Bean
	public AuthorController authorController() {
		return new AuthorController(authorService());
	}

}
