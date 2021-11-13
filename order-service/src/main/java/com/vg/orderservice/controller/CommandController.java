package com.vg.orderservice.controller;

import com.vg.orderservice.dto.CommandDTO;
import com.vg.orderservice.service.CommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class CommandController {

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
}
