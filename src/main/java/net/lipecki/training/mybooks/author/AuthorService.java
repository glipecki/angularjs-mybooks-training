package net.lipecki.training.mybooks.author;

import net.lipecki.training.mybooks.series.SeriesEntity;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * @author glipecki
 */
@Transactional
public class AuthorService {

	private final AuthorRepository authorRepository;

	public AuthorService(AuthorRepository authorRepository) {
		this.authorRepository = authorRepository;
	}

	public AuthorEntity addAuthor(String name) {
		return authorRepository.save(AuthorEntity.of(name));
	}

	public Optional<AuthorEntity> getAuthor(Long id) {
		return Optional.ofNullable(authorRepository.findOne(id));
	}

	public List<AuthorEntity> getAll() {
		return authorRepository.findAll();
	}

	public AuthorEntity updateAuthor(Long authorId, String name) {
		final AuthorEntity entity = getAuthor(authorId).orElseThrow(() -> new RuntimeException("Author with id=" + authorId + " not found"));
		entity.setName(name);
		return entity;
	}

}
