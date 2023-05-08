package com.example.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.api.model.SubCategory;



@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {
    
	SubCategory findByName(String name);  

    @Query("SELECT sc FROM SubCategory sc INNER JOIN Category c ON sc.category.id = c.id WHERE c.name = ?1 ORDER BY sc.id ASC")
    public List<SubCategory> findAllByCatName(String catName);
}
