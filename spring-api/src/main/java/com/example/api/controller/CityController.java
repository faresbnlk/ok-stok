package com.example.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.model.City;
import com.example.api.repository.CityRepository;

@RestController
@RequestMapping("/cities")
public class CityController {
    
    @Autowired
    private CityRepository cityRepository;

    @GetMapping("/all")
    public List<City> getAllCities(){
        return this.cityRepository.findAll();
    }

    @PostMapping(value = "/save", consumes = "application/json", produces = "application/json")
    public City saveCity(@RequestBody List<City> cities){
        for (City city: cities){
            this.cityRepository.save(city);
        }
        return null;
    }

    @GetMapping("/by-wilaya-name")
    public List<City> findCitiesByWilayaName(@RequestBody String wilayaName){
        return this.cityRepository.findCitiesByWilayaName(wilayaName);
    }
    
}
