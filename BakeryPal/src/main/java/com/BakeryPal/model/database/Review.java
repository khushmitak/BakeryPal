package com.BakeryPal.model.database;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Review")
public class Review {
    @Id
    @Column(name = "ReviewID")
    private int reviewID;

    @Column(name = "Reviews")
    private String reviews;

    @Column(name = "DateAndTime")
    private String dateAndTime;
}
