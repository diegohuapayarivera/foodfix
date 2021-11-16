package com.vg.orderservice.controller;

import com.vg.orderservice.dto.CommandDTO;
import com.vg.orderservice.entity.Command;
import com.vg.orderservice.entity.Plate;
import com.vg.orderservice.model.Sale;
import com.vg.orderservice.service.CommandService;
import com.vg.orderservice.service.PlateService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class CommandController {

    @Autowired
    private PlateService plateService;

    @Autowired
    private CommandService commandService;

    @GetMapping
    public ResponseEntity<List<CommandDTO>> getAll(){
        List<CommandDTO> commandDTOS = commandService.getAll();
        if (commandDTOS.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(commandDTOS);
    }

    @PostMapping
    public ResponseEntity<CommandDTO> save(@RequestBody CommandDTO orderDTO){
        CommandDTO orderDTONew = commandService.save(orderDTO);
        if (orderDTONew == null)
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(orderDTO);
    }

    @GetMapping("/plate")
    public ResponseEntity<List<Plate>> getPlates() {
        List<Plate> plates = plateService.getAll();
        if (plates.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(plates);
    }

    @CircuitBreaker(name = "salesCB", fallbackMethod = "fallBackSaveSale")
    @PostMapping("/savesale")
    public ResponseEntity<Sale> saveSale(@RequestBody Command command){
        Sale saleNew = commandService.saveSale(command);
        return ResponseEntity.ok(saleNew);
    }

    private ResponseEntity<Sale> fallBackSaveSale(@RequestBody Command command, RuntimeException e){
        return new ResponseEntity("El microservicio sale esta en mantimiento", HttpStatus.OK);
    }
}
