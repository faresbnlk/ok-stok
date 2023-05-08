package com.example.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.api.model.City;

public interface CityRepository extends JpaRepository<City, Long> {
    
    @Query("SELECT c FROM City c INNER JOIN Product p ON c.id = p.city.id WHERE c.wilaya = ?1 or c.wilayaArabic = ?1")
    public List<City> findCitiesByWilayaName(String wilaya);
}
