package com.example.api.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "categories")
@Data@NoArgsConstructor@AllArgsConstructor
public class Category {
    
    @Id
    private Long id;
    private String name;
    private String description = "Pas de description ...";

}
