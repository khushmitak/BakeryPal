package com.BakeryPal.dao;

import com.BakeryPal.model.database.Review;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface DeleteReview extends JpaRepository<Review, Integer> {
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Review " +
            "WHERE ReviewID=:ReviewID", nativeQuery = true)
    void deleteRating(@Param("ReviewID") int ReviewID);
}