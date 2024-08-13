package com.BakeryPal.dao;

import com.BakeryPal.model.database.Review;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AddItemReview extends JpaRepository<Review, Integer> {
    @Modifying
    @Transactional
    @Query(
            nativeQuery = true,
            value="INSERT INTO Review(Reviews, DateAndTime)" +
                    "VALUES (:reviews, utc_timestamp())")
    void addItemReview(@Param("reviews") String reviews);
}