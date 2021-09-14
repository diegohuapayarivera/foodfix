package com.example.demo123.DTO;

import com.example.demo123.model.SaleDetail;

import java.util.ArrayList;
import java.util.List;

public class OrderDTO {

    private String id;

    private Integer table;
    private String strartOrder;
    private List<PlateDTO> plates;

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

    public String getStrartOrder() {
        return strartOrder;
    }

    public void setStrartOrder(String strartOrder) {
        this.strartOrder = strartOrder;
    }

    public List<PlateDTO> getPlates() {
        return plates;
    }

    public void setPlates(List<PlateDTO> plates) {
        this.plates = plates;
    }

    public List<SaleDetail> getSaleDetailofPlateDTO(){
        List<SaleDetail> newSaleDetail = new ArrayList<>();
        for (PlateDTO plateDTO: this.plates)  {
            SaleDetail saleDetail = new SaleDetail();
            saleDetail.setPlateId(plateDTO.getPlate_id());
            saleDetail.setAmount(plateDTO.getAmount());
            saleDetail.setObservation(plateDTO.getObservation());
            newSaleDetail.add(saleDetail);
        }
        return newSaleDetail;
    }
}