package com.BakeryPal.model.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class BakeryItemResponse {
    private int itemID;
    private String itemName;
    private String description;
    private float price;
    private String categoryName;
    private String imageUrl;
}
