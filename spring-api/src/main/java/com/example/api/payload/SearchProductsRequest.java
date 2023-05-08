package com.example.api.payload;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor@ AllArgsConstructor
public class SearchProductsRequest {
    @JsonProperty
    private String categoryName;
    @JsonProperty
    private String subCategoryName;
    @JsonProperty
    private String wilaya;
    @JsonProperty
    private String field;
    @JsonProperty
    private boolean onlyUsedProduct;
    @JsonProperty
    private String option;
    private int limit;
    private int offset;
}
