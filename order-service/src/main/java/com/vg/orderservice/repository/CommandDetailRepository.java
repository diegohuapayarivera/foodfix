package com.vg.orderservice.repository;

import com.vg.orderservice.entity.CommandDetail;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommandDetailRepository extends JpaRepository<CommandDetail, Integer> {

    @Query(value = "SELECT * FROM commanddetail WHERE commanddetail.order_id = :idCommandDetail order by commanddetail.state asc", nativeQuery = true)
    List<CommandDetail> findAllByOrder_Id(@Param("idCommandDetail") int idCommandDetail);
}
