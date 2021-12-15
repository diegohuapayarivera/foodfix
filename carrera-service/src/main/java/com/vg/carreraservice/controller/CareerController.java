package com.vg.carreraservice.controller;

import com.vg.carreraservice.document.Career;
import com.vg.carreraservice.service.CareerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/career")
public class CareerController {

    @Autowired
    private CareerService careerService;


    @GetMapping
    public ResponseEntity<List<Career>> getAll() {
        return ResponseEntity.ok(careerService.getAll());
    }

    @PostMapping
    public ResponseEntity<Career> save(@RequestBody Career career) {
        return ResponseEntity.ok(careerService.save(career));
    }

    @PutMapping
    public ResponseEntity<String> update(@RequestBody Career career) {
        careerService.update(career);
        return ResponseEntity.ok("Update Career");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@Param("id") String id) {
        careerService.delete(id);
        return ResponseEntity.ok("Delete Career");
    }
}
