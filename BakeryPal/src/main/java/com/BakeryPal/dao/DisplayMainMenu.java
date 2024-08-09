package com.BakeryPal.dao;

import com.BakeryPal.model.database.User;
import com.BakeryPal.model.requests.MainMenuResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DisplayMainMenu extends JpaRepository<User, String> {
    @Query(value ="SELECT U.FirstName, U.LastName, A.Position " +
            "FROM User U " +
            "LEFT JOIN AdminUser A ON U.Username = A.Username " +
            "WHERE U.Username = :Username", nativeQuery = true)
    Optional<MainMenuResponse> getMainMenu(@Param("Username") String Username);
}