package com.ssm.controller;

import com.ssm.bean.wangyiwhite;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class wangyiController {
    private static Logger logger= LoggerFactory.getLogger(wangyiController.class);
    @Autowired(required = false)
    private RedisTemplate redisTemplate;
    @GetMapping("addroom")
    public String addroom(String roomname,String roomid)
    {
        wangyiwhite wangyiwhite=new wangyiwhite(roomname,roomid);
        try {

            redisTemplate.opsForList().leftPush("wangyiwhite",wangyiwhite);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return "插入失败";
        }
        return  "插入成功";
    }
    @GetMapping("deleteroom")
    public  String deleteroom(String roomname,String roomid)
    {
        wangyiwhite wangyiwhite=new wangyiwhite(roomname,roomid);
        try {
           if (redisTemplate.opsForList().remove("wangyiwhite",0,wangyiwhite)>0)
               return "删除成功";
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return "删除失败";
        }
        return "删除失败";
    }
    @GetMapping("getroom")
    public List<wangyiwhite> getroom()
    {
        List<wangyiwhite> list=redisTemplate.opsForList().range("wangyiwhite",0,-1);
        logger.info(list.toString());

        return list;
    }
}
