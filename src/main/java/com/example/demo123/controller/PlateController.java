package com.example.demo123.controller;

import com.example.demo123.model.Plate;
import com.example.demo123.repository.PlateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT,
        RequestMethod.DELETE})
@RequestMapping("/api/plates")
public class PlateController {

    @Autowired
    private PlateRepository plateRepository;

    @GetMapping("/")
    public ResponseEntity<List<Plate>> getAllPlates() {
        List<Plate> plates = plateRepository.findAll();
        return ResponseEntity.ok(plates);
    }
}
