package com.vg.orderservice.repository;

import com.vg.orderservice.entity.Command;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommandRepository extends JpaRepository<Command, Integer> {
}
