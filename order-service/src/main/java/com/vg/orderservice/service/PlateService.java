package com.vg.orderservice.service;

import com.vg.orderservice.entity.Plate;
import com.vg.orderservice.repository.PlateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;

@Service
public class PlateService {

    @Autowired
    PlateRepository plateRepository;

    public List<Plate> getAll() {
        return plateRepository.findAll(Sort.by(Sort.Direction.ASC, "Id"));
    }

    public Plate save(Plate plate) {
        return plateRepository.save(plate);
    }
}
