package com.example.api.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "reviews")
@Data@NoArgsConstructor@AllArgsConstructor
public class Review {
    @Id
    private Long id;
    private String reviewText;
    @OneToOne
    private User reviewer;
    
    private int mark;
}
