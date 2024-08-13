package com.BakeryPal.dao;

import java.util.List;

import com.BakeryPal.model.requests.GetReviews;
import com.BakeryPal.model.database.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GetBakeryReviews extends JpaRepository<Review, Integer>{
    @Query(value = "SELECT R.reviews as reviews, R.DateAndTime as dateAndTime FROM Review R ORDER BY R.DateAndTime DESC", nativeQuery = true)
    List<GetReviews> getBakeryReviews();
}