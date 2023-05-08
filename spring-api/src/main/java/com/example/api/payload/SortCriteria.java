package com.example.api.payload;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor@ AllArgsConstructor
public class SortCriteria {

    @JsonProperty
    private String field;

    @JsonProperty
    private boolean isActive;

    //Only DESC or ASC from front-end
    @JsonProperty
    private String option;
}
