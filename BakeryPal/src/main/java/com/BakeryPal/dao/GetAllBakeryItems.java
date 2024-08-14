package com.BakeryPal.dao;

import com.BakeryPal.model.database.BakeryItem;
import com.BakeryPal.model.requests.GetBakeryItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GetAllBakeryItems extends JpaRepository<BakeryItem, Integer> {
    @Query(
            nativeQuery = true,
            value = "SELECT B.itemID as itemID, B.itemName as itemName, B.description as description, " +
                    "B.price as price, B.categoryName as categoryName, B.imageUrl as imageUrl " +
                    "FROM BakeryItem B")
    List<GetBakeryItems> getAllBakeryItems();
}
