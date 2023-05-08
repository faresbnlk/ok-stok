package com.example.api.model;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name = "product_shipping")
@Data@NoArgsConstructor@AllArgsConstructor
public class ProductShipping {
    @Id
    private Long id;
    private boolean isShipped;
    private float ShippingPrice;
}
