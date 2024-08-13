package com.BakeryPal.controller;

import com.BakeryPal.dao.*;
import com.BakeryPal.model.requests.*;
import com.BakeryPal.model.database.BakeryItem;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/item")
public class BakeryItemController {
    @Autowired
    private AddBakeryItem addBakeryItem;

    @Autowired
    private EditItemDetails editItemDetails;

    @Autowired
    private GetBakeryItem getBakeryItem;

    @Autowired
    private AddItemReview addItemReview;

    @Autowired
    private DeleteReview deleteReview;

    @Autowired
    private GetSearchResults searchResults;

    @Autowired
    private GetBakeryReviews getBakeryReviews;

    @Autowired
    private ModelMapper mapper;

    @PostMapping("/addItem")
    public ResponseEntity<String> addItem(@RequestBody BakeryItemResponse bakeryItemResponse) {
        try {
            addBakeryItem.addBakeryItem(bakeryItemResponse.getItemName(), bakeryItemResponse.getDescription(), bakeryItemResponse.getPrice(), bakeryItemResponse.getCategoryName(), bakeryItemResponse.getImageUrl());
        } catch(Exception e) {
            if (e.getCause() instanceof ConstraintViolationException) {
                ConstraintViolationException constraintException =
                        (ConstraintViolationException) e.getCause();
                String constraintMsg = constraintException.getMessage();
                String message;
                if(constraintMsg.toUpperCase().contains("PRIMARY"))
                    message = "Unable to add item as item ID already exists.";
                else
                    message = "Unable to add the item.";
                return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
            } else {
                return new ResponseEntity<>("Unable to add the item. Please try again later!", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return new ResponseEntity<>("Item has been added successfully.",HttpStatus.OK);
    }

    @PutMapping("/{itemID}/editItemDetails")
    @CrossOrigin
    public ResponseEntity<String> editItemDetails(@PathVariable int itemID, @RequestBody EditItemResponse editDescriptionResponse) {
        try{
            if((verifyItemExists(itemID))!=null)
                editItemDetails.editItemDetails(itemID, editDescriptionResponse.getDescription());
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    private BakeryItem verifyItemExists(int itemID) {
        final Optional<BakeryItem> item = getBakeryItem.getBakeryItem(itemID);
        if (item.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item does not exist");
        }
        return item.get();
    }

    @PostMapping("/addReview")
    public ResponseEntity<String> addItemReview(@RequestBody ReviewItemRequest reviewItemRequest) {
        try {
            addItemReview.addItemReview(reviewItemRequest.getReviews());
        } catch (Exception e) {
            if (e.getCause() instanceof ConstraintViolationException) {
                ConstraintViolationException constraintException = (ConstraintViolationException) e.getCause();
                String constraintMsg = constraintException.getMessage();
                String message;
                if (constraintMsg.toUpperCase().contains("PRIMARY"))
                    message = "Unable to add review as a review for this bakery already exists.";
                else if (constraintMsg.toUpperCase().contains("FOREIGN"))
                    message = "Unable to find the bakery to add a review.";
                else
                    message = "Unable to add your review for the bakery.";
                return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
            } else {
                return new ResponseEntity<>("Unable to add your review for the bakery.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return new ResponseEntity<>("Your review has been added.", HttpStatus.OK);
    }

    @PostMapping("/{itemID}/deleteReview")
    public ResponseEntity<String> deleteReview(@PathVariable int itemID, @RequestBody DeleteReviewRequest deleteRatingRequest) {
        try {
            deleteReview.deleteRating(itemID);
        }catch(Exception e) {
            return new ResponseEntity<>("Unable to remove review.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("Your review has been removed.",HttpStatus.OK);
    }

    @GetMapping("/viewReviews")
    public List<GetReviews> getBakeryReviews() {
        return getBakeryReviews.getBakeryReviews();
    }

    @PostMapping("/searchItem")
    public List<SearchResultsResponse> searchItem(@RequestBody SearchResultsRequest searchItem) {
        return searchResults.getSearchResults(searchItem.getKeyword(),searchItem.getCategoryName());
    }

    @GetMapping("/{itemID}")
    public BakeryItemResponse getItemDescription(@PathVariable int itemID) {
        final BakeryItem item = verifyItemExists(itemID);
        return mapper.map(item, BakeryItemResponse.class);
    }

}
