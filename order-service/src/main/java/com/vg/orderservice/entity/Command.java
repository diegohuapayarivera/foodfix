package com.vg.orderservice.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "command")
@ToString
public class Command {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "state")
    private String state;
    @Column(name = "start")
    private LocalTime start;
    @Column(name = "tablet")
    private int tablet;
    @Column(name = "observation")
    private String observation;
}
