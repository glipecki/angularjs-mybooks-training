package net.lipecki.training.mybooks.series;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author glipecki
 */
public interface SeriesRepository extends JpaRepository<SeriesEntity, Long> {
}
