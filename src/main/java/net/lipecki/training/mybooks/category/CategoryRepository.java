package net.lipecki.training.mybooks.category;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author glipecki
 */
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
}
