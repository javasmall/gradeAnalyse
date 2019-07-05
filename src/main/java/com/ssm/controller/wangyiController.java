package com.ssm.controller;

import com.ssm.bean.wangyiwhite;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;


@RestController
public class wangyiController {
    private static Logger logger= LoggerFactory.getLogger(wangyiController.class);
    @Autowired(required = false)
    private RedisTemplate redisTemplate;
    @GetMapping("addroom")
    public String addroom(String roomname,String roomid)
    {
        wangyiwhite wangyiwhite=new wangyiwhite(roomname,roomid);
        wangyiwhite.setNum(1);
        try {

            Date date=new Date();
            wangyiwhite.setDate(date);
            redisTemplate.opsForList().leftPush("wangyiwhite",wangyiwhite);
            redisTemplate.expire("wangyiwhite",5L,TimeUnit.HOURS);
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
    @GetMapping("inroom")
    public String inroom(String roomid)
    {
        List<wangyiwhite> list=redisTemplate.opsForList().range("wangyiwhite",0,-1);
        for(wangyiwhite wangyiwhite:list)
        {
            if(wangyiwhite.getRoomid().equals(roomid))
            {
                redisTemplate.opsForList().remove("wangyiwhite",0,wangyiwhite);
                wangyiwhite.setDate(new Date());
                wangyiwhite.setNum(wangyiwhite.getNum()+1);
                redisTemplate.opsForList().leftPush("wangyiwhite",wangyiwhite);
                return "成功";
            }
        }
        return "失败";
    }
    @GetMapping("exitroom")
    public String exitroom(String roomid)
    {
        List<wangyiwhite> list=redisTemplate.opsForList().range("wangyiwhite",0,-1);
        for(wangyiwhite wangyiwhite:list)
        { if(wangyiwhite.getRoomid().equals(roomid))
            {
                redisTemplate.opsForList().remove("wangyiwhite",0,wangyiwhite);
                wangyiwhite.setNum(wangyiwhite.getNum()-1);
                if(wangyiwhite.getNum()>1){redisTemplate.opsForList().leftPush("wangyiwhite",wangyiwhite);}
                return "成功";
            }
        }
        return "失败";
    }
    @GetMapping("getroom")
    public List<wangyiwhite> getroom()
    {
        List<wangyiwhite> list=redisTemplate.opsForList().range("wangyiwhite",0,-1);
        Date date=new Date();
        for(wangyiwhite wangyiwhite:list)
        {
            Date da=wangyiwhite.getDate();
            long hour=(date.getTime()-da.getTime())/(1000*60*60);
            if(hour>=5)
            {
                redisTemplate.opsForList().remove("wangyiwhite",0,wangyiwhite);
                list.remove(wangyiwhite);
            }
        }
        logger.info(list.toString());

        return list;
    }
}
