package com.example.api.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "cities")
@Data @NoArgsConstructor @AllArgsConstructor
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty
    private Long id;
    @JsonProperty
    private String city;
    @JsonProperty
    private String cityArabic;
    @JsonProperty
    private String daira;
    @JsonProperty
    private String dairaArabic;
    @JsonProperty
    private String wilayaCode;
    @JsonProperty
    private String wilaya;
    @JsonProperty
    private String wilayaArabic;
    @JsonProperty
    private float longitude;
    @JsonProperty
    private float latitude;
    

    
}