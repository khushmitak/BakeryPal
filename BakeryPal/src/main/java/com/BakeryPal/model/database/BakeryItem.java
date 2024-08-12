package com.BakeryPal.model.database;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Bakeryitem")
public class BakeryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ItemID")
    private int itemID;

    @Column(name = "ItemName")
    private String itemName;

    @Column(name = "Description")
    private String description;

    @Column(name = "Price")
    private float price;

    @Column(name = "CategoryName")
    private String categoryName;
}