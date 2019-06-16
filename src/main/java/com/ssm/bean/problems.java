package com.ssm.bean;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor

public class problems {

    int id;
    @JsonProperty("type")
    private String type;

    @JsonProperty("point")//知识点
    private String point;

    private String details;
    private String school;

    private String imgurl;
    private String answerurl;

}
