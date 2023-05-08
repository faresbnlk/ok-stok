package com.example.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.model.Category;
import com.example.api.model.Product;
import com.example.api.model.SubCategory;
import com.example.api.payload.SearchProductKeyWordRequest;
import com.example.api.payload.SearchProductsRequest;
import com.example.api.repository.CategoryRepository;
import com.example.api.repository.ProductEntityManagerRepo;
import com.example.api.repository.ProductRepository;
import com.example.api.repository.SubCategoryRepository;
import com.example.api.service.ProductService;

@RestController
@RequestMapping("/product")
public class ProductController {
    
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SubCategoryRepository subCategoryRepository;    

    @Autowired
    private ProductEntityManagerRepo productEntityManagerRepo;
    
    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        if (products.size() > 0) {
            return ResponseEntity.ok(products);
        }
        else {
            return ResponseEntity.noContent().build();
        }
    }

    @PostMapping(value = "/find-with-creteria", consumes = "application/json", produces = "application/json")
    public ResponseEntity<List<Product>> getPaginatedAndSortedProductsListBySearchCriteria(@RequestBody SearchProductsRequest searchProductsRequest){
        return productService.getPaginatedAndSortedProductsListByFilters(searchProductsRequest);
    }

    @PostMapping(value = "/find-with-kw", consumes = "application/json", produces = "application/json")
    public ResponseEntity<List<Product>> getPaginatedAndSortedProductsListByKeyWord(@RequestBody SearchProductKeyWordRequest searchProductKeyWordRequest){
        return productService.getProductListByKeyWord(searchProductKeyWordRequest);
    }

    @PostMapping(value = "/products-name-kw")
    public ResponseEntity<List<String>> getProductsNameByKeyWord(@RequestBody String keyWord){
        return productService.getProductsNameByKeyWord(keyWord);
    }

    @PostMapping(value = "/find-by-id", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> getProductByID(@RequestBody Long productId){
        try{
            return new ResponseEntity<>(productRepository.findById(productId), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<Product>> getPaginatedAndSortedProductsListByFilters(SearchProductsRequest searchProductsRequest){
        try{
            return new ResponseEntity<>(productEntityManagerRepo.findProductsByFilters(searchProductsRequest), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/sub-cat-to-json", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> GetSubCatsNamesToJSON(){
        try {
            String result = "$CATEGORY$" + ": " + "{\n";
            List<Category> catList = new ArrayList<Category>();
            List<SubCategory> subCatList = new ArrayList<SubCategory>();
            catList = categoryRepository.findAll();
            subCatList = subCategoryRepository.findAll();
            for (Category category : catList) {
                result = result + "\n$" + category.getName() + "$: {\n" + "\t$NAME$: " + "$french name$,\n";
                for (SubCategory subCategory : subCatList) {
                    if(subCategory.getCategory().getId() == category.getId()){
                        result = result + "\t$" + subCategory.getName() + "$: { \n" + "\t$NAME$:" +  "$french subcat name$},";
                    }
                    if (subCategory.getCategory().getId() == subCatList.size() -1){
                        result = result + "\n}";
                    }
                }
            }
            return new ResponseEntity<>(result.replace("$", "\""), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_GATEWAY);
        }
    }

}
