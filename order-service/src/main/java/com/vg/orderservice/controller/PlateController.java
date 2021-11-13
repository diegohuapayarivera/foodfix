package com.vg.orderservice.controller;

import com.vg.orderservice.entity.Plate;
import com.vg.orderservice.service.PlateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/plate")
public class PlateController {

    @Autowired
    private PlateService plateService;

    @GetMapping
    public ResponseEntity<List<Plate>> getAll() {
        List<Plate> plates = plateService.getAll();
        if (plates.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(plates);
    }
}
