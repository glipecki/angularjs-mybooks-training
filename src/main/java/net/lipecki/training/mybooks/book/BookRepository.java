package net.lipecki.training.mybooks.book;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author glipecki
 */
public interface BookRepository extends JpaRepository<BookEntity, Long> {
}
