package com.example.api.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.model.Category;
import com.example.api.model.SubCategory;
import com.example.api.repository.CategoryRepository;
import com.example.api.repository.SubCategoryRepository;


@RestController
@RequestMapping("/cat")
public class CategoryController {
    
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        if (categories.size() > 0) {
            return ResponseEntity.ok(categories);
        }
        else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/test")
    public String testFunction() throws Exception {
        return "";
    }

    @GetMapping("sub/by-catName")
    public List<SubCategory> getAllSubCatByCatName(@RequestParam String catName) throws Exception {
        return subCategoryRepository.findAllByCatName(catName);
    }

    @GetMapping("sub/all")
    public List<SubCategory> getAllSubCats() throws Exception {
        return subCategoryRepository.findAll();
    }

}
