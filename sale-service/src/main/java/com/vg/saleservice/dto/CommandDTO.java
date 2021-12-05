package com.vg.saleservice.dto;

import lombok.Data;

import java.time.LocalTime;

@Data
public class CommandDTO {
    private int id;
    private double total_price;
}
