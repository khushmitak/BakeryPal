package com.BakeryPal.dao;

import com.BakeryPal.model.database.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GetCategories extends JpaRepository<Category, String>  {
    @Query(
            nativeQuery = true,
            value = "SELECT CategoryName FROM Category")
    List<Category> getCategories();
}