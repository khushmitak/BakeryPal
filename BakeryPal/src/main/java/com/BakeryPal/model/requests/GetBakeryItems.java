package com.BakeryPal.model.requests;

public interface GetBakeryItems {
    int getItemID();
    String getItemName();
    String getDescription();
    float getPrice();
    String getCategoryName();
    String getImageUrl();
}
