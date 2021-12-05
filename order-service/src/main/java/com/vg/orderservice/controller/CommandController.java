package com.vg.orderservice.controller;

import com.vg.orderservice.dto.CommandDTO;
import com.vg.orderservice.entity.Command;
import com.vg.orderservice.entity.CommandDetail;
import com.vg.orderservice.entity.Plate;
import com.vg.orderservice.model.Sale;
import com.vg.orderservice.service.CommandService;
import com.vg.orderservice.service.PlateService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "*", methods = {RequestMethod.DELETE, RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class CommandController {

    @Autowired
    private PlateService plateService;

    @Autowired
    private CommandService commandService;

    @GetMapping
    public ResponseEntity<List<CommandDTO>> getInitateAndProcessStates() {
        List<CommandDTO> commandDTOS = commandService.getInitateAndProcessStates();
        if (commandDTOS.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(commandDTOS);
    }

    @GetMapping("/finished")
    public ResponseEntity<List<CommandDTO>> getFinishedStates(){
        List<CommandDTO> commandDTOS = commandService.getFinishedStates();
        if (commandDTOS.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(commandDTOS);
    }

    @PostMapping
    public ResponseEntity<CommandDTO> save(@RequestBody CommandDTO commandDTO) {
        System.out.println("orderDTO.toString() = " + commandDTO.toString());
        return ResponseEntity.ok(commandService.save(commandDTO));
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
    public ResponseEntity<Sale> saveSale(@RequestBody Command command) {
        Sale saleNew = commandService.saveSale(command);
        return ResponseEntity.ok(saleNew);
    }

    private ResponseEntity<Map<String, Object>> fallBackSaveSale(@RequestBody Command command, RuntimeException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("Mensaje", "El microservicio Sale-service esta inactivo o en matenimiento");
        response.put("Request", command);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @PostMapping("/updateOrder")
    public ResponseEntity<Command> updateCommand(@RequestBody Command command) {
        System.out.println("command.toString() = " + command.toString());
        return ResponseEntity.ok(commandService.updateCommand(command));
    }

    @PostMapping("/updateOrderDetail")
    public ResponseEntity<CommandDetail> updateCommandDetail(@RequestBody CommandDetail commandDetail) {
        System.out.println("command.toString() = " + commandDetail.toString());
        return ResponseEntity.ok(commandService.updateCommandDetail(commandDetail));
    }

    @PostMapping("/plate")
    public ResponseEntity<Plate> savePlate(@RequestBody Plate plate) {
        return ResponseEntity.ok(plateService.save(plate));
    }



}
