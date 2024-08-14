package com.BakeryPal.dao;

import com.BakeryPal.model.database.BakeryItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DeleteBakeryItem extends JpaRepository<BakeryItem, Integer> {
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM BakeryItem WHERE ItemID = :itemID", nativeQuery = true)
    void deleteBakeryItem(@Param("itemID") int itemID);
}
