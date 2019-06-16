package com.ssm.bean;

import lombok.Data;

@Data
public class login {
    private int id;
    private String username;
    private String password;
    private String role;
    private long roleidnumber;
}
