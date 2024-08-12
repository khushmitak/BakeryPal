package com.BakeryPal.dao;

import com.BakeryPal.model.requests.SearchResultsResponse;
import com.BakeryPal.model.database.BakeryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GetSearchResults extends JpaRepository<BakeryItem,Integer> {
    @Query(value= "SELECT I.ItemID AS 'ItemID', " +
            "I.ItemName AS 'ItemName', " +
            "I.Price AS 'Price', " +
            "I.Description AS 'Description', " +
            "I.ImageUrl " +
            "FROM BakeryItem AS I " +
            "WHERE " +
            "(I.ItemName LIKE :keyword) AND I.CategoryName LIKE :categoryName " +
            "ORDER BY I.ItemName ASC",
            nativeQuery = true)
    List<SearchResultsResponse> getSearchResults(@Param("keyword") String keyword,
                                                 @Param("categoryName") String categoryName);
}