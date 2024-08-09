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
            value = "UPDATE Item SET ItemName = :itemName, Description = :description, Price = :price WHERE ItemID = :itemID")
    void editDescription(@Param("itemID") int itemID, @Param("description") String description);
}