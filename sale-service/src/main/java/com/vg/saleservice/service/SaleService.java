package com.vg.saleservice.service;

import com.vg.saleservice.dto.CommandDTO;
import com.vg.saleservice.entity.Sale;
import com.vg.saleservice.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    public Sale save(CommandDTO commandDTO) {
        Sale saleNew = new Sale();
        saleNew.setCommaind_id(commandDTO.getId());
        saleNew.setSell(LocalDate.now());
        return saleRepository.save(saleNew);
    }
}
