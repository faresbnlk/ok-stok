package com.example.api.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name = "products")
@Data@NoArgsConstructor@AllArgsConstructor
public class Product {
    
    @Id
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    private SubCategory subCategory;

    private String name;
    private String description;
    private Long stock;
    private boolean returnProduct;
    private boolean usedProduct;
    private String brand;
    private float price;
    //private float reviewsAverage = this.calculateReviewAverage();
    private float reviewsAverage;

    @Column(nullable = false, name = "created_on")
    private Date dateCreated = new Date();

    @OneToMany
    private List<Image> images; 

    @OneToMany
    private List<Review> reviews;

    @OneToOne
    private ProductShipping shipping;

    @OneToOne
    private City city;
    
    private float calculateReviewAverage(){
        float s = 0;
        float avrg = 0;
        if (this.reviews.size() > 0){
            for (Review review : this.reviews) {
                s = s + review.getMark();
            }
            avrg = s/this.reviews.size();
        }
        return avrg;
    }
}
