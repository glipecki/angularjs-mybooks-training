package net.lipecki.training.mybooks;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static springfox.documentation.builders.PathSelectors.regex;

/**
 * http://localhost:8080/swagger-ui.html
 *
 * @author glipecki
 */
@EnableSwagger2
@Configuration
public class SwaggerConfiguration {

	@Bean
	public Docket booksApi() {
		return new Docket(DocumentationType.SWAGGER_2)
				.apiInfo(new ApiInfoBuilder()
						.title("MyBooks REST API")
						.description("MyBooks REST API")
						.version("1")
						.contact("Grzegorz Lipecki <grzegorz.lipecki@gmail.com>")
						.build())
				.select()
				.paths(regex("/api/.*"))
				.build();
	}

}
