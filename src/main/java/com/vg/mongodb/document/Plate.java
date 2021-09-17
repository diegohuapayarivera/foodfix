package com.vg.mongodb.document;

public class Plate {

    private Integer plate_id;

    private Integer amount;

    private String observation;

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public Integer getPlate_id() {
        return plate_id;
    }

    public void setPlate_id(Integer plate_id) {
        this.plate_id = plate_id;
    }
}
