package com.vg.orderservice.dto;

import com.vg.orderservice.entity.Command;
import com.vg.orderservice.entity.CommandDetail;
import lombok.Data;
import java.util.List;

@Data
public class CommandDTO {
    private Command command;
    private List<CommandDetail> commandDetails;
}
