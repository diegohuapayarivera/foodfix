package com.vg.mongodb.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalTime;
import java.util.List;

@Document(collection = "order")
public class Order {

    @Id
    private String id;

    private Integer table;

    private LocalTime strartOrder = LocalTime.now();

    private List<Plate> plates;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getTable() {
        return table;
    }

    public void setTable(Integer table) {
        this.table = table;
    }

    public LocalTime getStrartOrder() {
        return strartOrder;
    }

    public void setStrartOrder(LocalTime strartOrder) {
        this.strartOrder = strartOrder;
    }

    public List<Plate> getPlates() {
        return plates;
    }

    public void setPlates(List<Plate> plates) {
        this.plates = plates;
    }
}
