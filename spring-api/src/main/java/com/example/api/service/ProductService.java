package com.example.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.api.model.Product;
import com.example.api.payload.SearchProductKeyWordRequest;
import com.example.api.payload.SearchProductsRequest;
import com.example.api.repository.ProductEntityManagerRepo;
import com.example.api.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductEntityManagerRepo productEntityManagerRepo;

    public ResponseEntity<List<Product>> getPaginatedAndSortedProductsListByFilters(SearchProductsRequest searchProductsRequest){
        try{
            // Pageable sortedPageable = PageRequest.of(searchProductsRequest.getPage(), searchProductsRequest.getSize());
            return new ResponseEntity<>(productEntityManagerRepo.findProductsByFilters(searchProductsRequest), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<Product>> getProductListByKeyWord(SearchProductKeyWordRequest searchProductKeyWordRequest){
        try{
            return new ResponseEntity<>(productEntityManagerRepo.getProductListByKeyWord(searchProductKeyWordRequest), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<String>> getProductsNameByKeyWord(String keyWord){
        try{
            List<String> result = productEntityManagerRepo.getProductsNameByKeyWord(keyWord);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

}
