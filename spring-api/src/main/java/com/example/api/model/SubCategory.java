package com.example.api.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "sub_categories")
@Data@NoArgsConstructor@AllArgsConstructor
public class SubCategory {
    
    @Id
    private Long id;
    
    @OneToOne
    private Category category;
    
    private String name;
    private String description = "Pas de description ...";

}
