package com.vg.orderservice.feignclients;


import com.vg.orderservice.entity.Command;
import com.vg.orderservice.model.Sale;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient(name = "sale-service", url = "http://100.25.7.210:30006")
@RequestMapping("/sale")
public interface SaleFeignClient {

    @PostMapping
    Sale save(@RequestBody Command command);
}
