package com.vg.carreraservice.document;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "career")
@Data
public class Career {

    @Id
    private String id;
    private String name;
    private String institute;
}
