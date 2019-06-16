package com.ssm.bean;

public class teacher {
   private String username;
   private  String password;
   private long classid;
   private  long phone;
   private String schoolname;

    public teacher(String username, String password, long classid, long phone, String schoolname) {
        this.username = username;
        this.password = password;
        this.classid = classid;
        this.phone = phone;
        this.schoolname = schoolname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public long getClassid() {
        return classid;
    }

    public void setClassid(long classid) {
        this.classid = classid;
    }

    public long getPhone() {
        return phone;
    }

    public void setPhone(long phone) {
        this.phone = phone;
    }

    public String getSchoolname() {
        return schoolname;
    }

    public void setSchoolname(String schoolname) {
        this.schoolname = schoolname;
    }
}