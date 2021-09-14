package com.example.demo123.controller;

import com.example.demo123.DTO.OrderDTO;
import com.example.demo123.model.Sale;
import com.example.demo123.model.SaleDetail;
import com.example.demo123.repository.SaleDetailRepository;
import com.example.demo123.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT,
        RequestMethod.DELETE})
@RequestMapping("/api/sales")
public class SaleController {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private SaleDetailRepository saleDetailRepository;

    @PostMapping("/sale")
    public ResponseEntity<String> saleOrder(@Validated @RequestBody OrderDTO orderDTO){

        Sale newSale = new Sale();
        List<SaleDetail> newSaleDetails = new ArrayList<>();
        newSale = saleRepository.save(new Sale());
        newSaleDetails = orderDTO.getSaleDetailofPlateDTO();

        for (SaleDetail saleDetail : newSaleDetails) {
            saleDetail.setSale_id(newSale.getId());
            saleDetailRepository.save(saleDetail);
        }
        return ResponseEntity.ok("Sale Order success");
    }

}
