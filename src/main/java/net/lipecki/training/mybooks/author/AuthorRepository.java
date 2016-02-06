package net.lipecki.training.mybooks.author;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author glipecki
 */
public interface AuthorRepository extends JpaRepository<AuthorEntity, Long> {
}
