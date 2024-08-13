package com.BakeryPal.dao;

import java.util.Optional;

import com.BakeryPal.model.database.BakeryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GetBakeryItem extends JpaRepository<BakeryItem, Integer> {
    @Query(
            nativeQuery = true,
            value = "SELECT ItemID, ImageUrl, ItemName, Description, Price, CategoryName FROM BakeryItem WHERE ItemID = :itemID")
    Optional<BakeryItem> getBakeryItem(@Param("itemID") int itemID);
}