package com.example.api.payload;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor@ AllArgsConstructor
public class SearchProductKeyWordRequest {
    @JsonProperty
    private String keyWord;
    @JsonProperty
    private String wilaya;
    @JsonProperty
    private boolean onlyUsedProduct;
    private int limit;
    private int offset;
}
