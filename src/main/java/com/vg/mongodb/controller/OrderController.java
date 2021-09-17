package com.vg.mongodb.controller;

import com.vg.mongodb.document.Order;
import com.vg.mongodb.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT,
        RequestMethod.DELETE})
@RequestMapping(value = "/api/orders" , produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderController {

    @Autowired
    OrderRepository orderRepository;

    @PostMapping("/order")
    public ResponseEntity<Order> create(@Validated @RequestBody Order o) {
        Order newOrder = orderRepository.insert(o);
        return ResponseEntity.ok(newOrder);
    }

    @GetMapping("/")
    public ResponseEntity<List<Order>> readAll() {
        List<Order> orders = orderRepository.findAll();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(orders);
    }

    @DeleteMapping("/order/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        orderRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Delete Order");
    }
}
