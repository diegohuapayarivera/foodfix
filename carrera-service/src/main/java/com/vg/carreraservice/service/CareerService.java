package com.vg.carreraservice.service;

import com.vg.carreraservice.document.Career;
import com.vg.carreraservice.repository.CareerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CareerService {

    @Autowired
    private CareerRepository careerRepository;

    public List<Career> getAll() {
        return careerRepository.findAll();
    }

    public Career save(Career career) {
        return careerRepository.save(career);
    }

    public void delete(String careerId) {
        careerRepository.deleteById(careerId);
    }

    public Career update(Career career){
        return careerRepository.save(career);
    }

}
