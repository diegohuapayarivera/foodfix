package com.vg.orderservice.repository;

import com.vg.orderservice.entity.CommandDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommandDetailRepository extends JpaRepository<CommandDetail, Integer> {
}
