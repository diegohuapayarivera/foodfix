package com.vg.orderservice.repository;

import com.vg.orderservice.entity.Command;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommandRepository extends JpaRepository<Command, Integer> {

    @Query(value = "select * from command where command.state between 'I' and 'P' order by command.id desc", nativeQuery = true)
    List<Command> findAllInitateAndProcessStates();

    @Query(value = "select * from command where command.state = 'T' order by command.id desc", nativeQuery = true)
    List<Command> findAllFinishedStates();
}
