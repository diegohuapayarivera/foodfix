package com.vg.saleservice.controller;

import com.vg.saleservice.dto.CommandDTO;
import com.vg.saleservice.entity.Sale;
import com.vg.saleservice.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sale")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @PostMapping
    public ResponseEntity<Sale> save(@RequestBody CommandDTO commandDTO) {
        System.out.println("commandDTO.toString() = " + commandDTO.toString());
        Sale saleNew = saleService.save(commandDTO);
        return ResponseEntity.ok(saleNew);
    }

    @GetMapping
    public ResponseEntity<List<Sale>> getAll() {
        return ResponseEntity.ok(saleService.getAll());
    }
}
