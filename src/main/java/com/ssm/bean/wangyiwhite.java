package com.ssm.bean;

import java.io.Serializable;

public class wangyiwhite implements Serializable {
    private String roomname;
    private String roomid;

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
}
