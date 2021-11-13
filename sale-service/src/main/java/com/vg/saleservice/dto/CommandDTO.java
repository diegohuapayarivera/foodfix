package com.vg.saleservice.dto;

import lombok.Data;

import java.time.LocalTime;

@Data
public class CommandDTO {
    private int id;
    private char state;
    private LocalTime start;
    private int tablet;
    private String observation;
}
