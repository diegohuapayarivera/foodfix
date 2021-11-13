package com.vg.saleservice.repository;

import com.vg.saleservice.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface SaleRepository extends JpaRepository<Sale, Integer> {
}
