package com.ssm.bean;

import java.io.Serializable;
import java.util.Date;

public class wangyiwhite implements Serializable {
    private String roomname;
    private String roomid;
    private Date date;
    private int num;


    public wangyiwhite(){}
    public wangyiwhite(String roomname, String roomid) {
        this.roomname = roomname;
        this.roomid = roomid;
    }

    public String getRoomname() {
        return roomname;
    }

    public void setRoomname(String roomname) {
        this.roomname = roomname;
    }

    public String getRoomid() {
        return roomid;
    }

    public void setRoomid(String roomid) {
        this.roomid = roomid;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }
}
