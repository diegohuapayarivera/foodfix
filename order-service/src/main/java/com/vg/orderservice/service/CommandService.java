package com.vg.orderservice.service;

import com.vg.orderservice.config.RestTemplateConfig;
import com.vg.orderservice.dto.CommandDTO;
import com.vg.orderservice.entity.Command;
import com.vg.orderservice.entity.CommandDetail;
import com.vg.orderservice.feignclients.SaleFeignClient;
import com.vg.orderservice.model.Sale;
import com.vg.orderservice.repository.CommandDetailRepository;
import com.vg.orderservice.repository.CommandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class CommandService {

    @Autowired
    private CommandRepository commandRepository;

    @Autowired
    private CommandDetailRepository commandDetailRepository;

    @Autowired
    private SaleFeignClient saleFeignClient;

    private RestTemplate restTemplate;

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("hh:mm:ss");

    public List<CommandDTO> getAll() {
        List<CommandDTO> commandDTOS = new ArrayList<>();
        List<Command> commands = commandRepository.findAll();
        commands.stream().forEach(command -> {
            CommandDTO commandDTONew = new CommandDTO();
            List<CommandDetail> commandDetailsNew = commandDetailRepository.findAllByOrder_Id(command.getId());
            commandDTONew.setCommand(command);
            commandDTONew.setCommandDetails(commandDetailsNew);
            commandDTOS.add(commandDTONew);
        });
        return commandDTOS;
    }

    public CommandDTO save(CommandDTO commandDTO) {
        CommandDTO commandDTONew = new CommandDTO();
        commandDTO.getCommand().setState("I");
        commandDTO.getCommand().setStart(LocalTime.parse(LocalTime.now().format(formatter)));
        Command commandNew = commandRepository.save(commandDTO.getCommand());
        commandDTONew.setCommand(commandNew);
        commandDTO.getCommandDetails().stream().forEach(commandDetailDTO -> {
            commandDetailDTO.setOrder_id(commandNew.getId());
            commandDetailDTO.setState(false);
        });
        List<CommandDetail> commandDetails = commandDetailRepository.saveAll(commandDTO.getCommandDetails());
        commandDTONew.setCommandDetails(commandDetails);
        return commandDTONew;
    }

    public Sale saveSale(Command command) {
        return saleFeignClient.save(command);
    }

    public CommandDetail updateCommandDetail(CommandDetail commandDetail) {
        return commandDetailRepository.save(commandDetail);
    }

    public Command updateCommand(Command command) {
        return commandRepository.save(command);
    }
}


