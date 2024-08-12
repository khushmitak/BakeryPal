package com.BakeryPal.model.requests;

public interface SearchResultsResponse {
    Integer getItemID();
    String getItemName();
    String getDescription();
    String getPrice();
    String getImageUrl();
}