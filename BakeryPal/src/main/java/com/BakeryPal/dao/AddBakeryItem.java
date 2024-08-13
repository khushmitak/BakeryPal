package com.BakeryPal.dao;

import com.BakeryPal.model.database.BakeryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.transaction.annotation.Transactional;

@Repository
public interface AddBakeryItem extends JpaRepository<BakeryItem, Integer> {
    @Modifying
    @Transactional
    @Query(
            nativeQuery = true,
            value = "INSERT INTO BakeryItem (itemName, description, price, categoryName, imageUrl) " +
                    "VALUES (:itemName, :description, :price, :categoryName, :imageUrl)"
    )
    void addBakeryItem(@Param("itemName") String itemName,
            @Param("description") String description, @Param("price") Float price,
            @Param("categoryName") String categoryName, @Param("imageUrl") String imageUrl
    );
}