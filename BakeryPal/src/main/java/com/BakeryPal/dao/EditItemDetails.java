package com.BakeryPal.dao;

import com.BakeryPal.model.database.BakeryItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EditItemDetails extends JpaRepository<BakeryItem, Integer> {
    @Modifying
    @Transactional
    @Query(
            nativeQuery = true,
            value = "UPDATE BakeryItem SET Price = :price, ImageUrl = :imageUrl WHERE ItemID = :itemID")
    void editItemDetails(@Param("itemID") int itemID, @Param("price") float price,
                         @Param("imageUrl") String imageUrl);
}