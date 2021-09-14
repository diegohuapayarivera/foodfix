package com.example.demo123.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "sale")
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "sell_order")
    private LocalDate sellOrder = LocalDate.now();


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getSellOrder() {
        return sellOrder;
    }

    public void setSellOrder(LocalDate sellOrder) {
        this.sellOrder = sellOrder;
    }
}
