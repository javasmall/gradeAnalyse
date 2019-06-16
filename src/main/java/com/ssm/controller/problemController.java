package com.ssm.controller;

import com.ssm.bean.problems;
import com.ssm.dao.problemMapper;
import com.ssm.es.Esteamplate;
import com.ssm.service.problemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class problemController {

    @Autowired
    problemService problemService;
    @Autowired
    problemMapper problemMapper;
    @Autowired
    RedisTemplate redisTemplate;
    @Autowired
    Esteamplate esteamplate;
    @ResponseBody
    @PostMapping("addtiku")
    public Map<String,String> addtiku(MultipartFile file[], String lesson, String point, HttpServletRequest request) throws IOException {
        int index=2000;
        if(redisTemplate.hasKey("index"))
        {
            index=(int)redisTemplate.opsForValue().get("index");
            redisTemplate.opsForValue().set("index",index+1);
        }
        else
        {
            redisTemplate.opsForValue().set("index",index);
        }
        String details=problemService.ocrimg(file[0]);
        savafile(index,file[0],lesson,point,details,request);
        savafile(index,file[1],lesson,point,details,request);
        String filename=index+file[0].getOriginalFilename();
        String filename2=index+file[1].getOriginalFilename();
        String imgurl="tiku/"+point+"/"+filename;
        String answerurl="tiku/"+point+"/"+filename2;
        problems problems=new problems(index,lesson,point,details,"just",imgurl,answerurl);
        problemService.inserttiku(problems);
        esteamplate.addproblems("problem","tiku",problems);
        Map<String,String>map=new HashMap<>();
        map.put("code","0");
        map.put("msg","");
        map.put("data","");
        return  map;
    }

    private void savafile(int index,MultipartFile file, String lesson, String point, String details, HttpServletRequest request) throws IOException {
        String filename=index+""+file.getOriginalFilename();

        System.out.println(lesson+" "+point+" "+details);
        String filepath=request.getSession().getServletContext().getRealPath("tiku/"+point);
        File file1=new File(filepath);
        if(!file1.exists()){file1.mkdirs();}
        System.out.println(filepath);
        File file2=new File(file1,filename);//
        if(!file2.exists()){file2.createNewFile();}
        file.transferTo(file2);
    }


    @ResponseBody
    @GetMapping("gettiku")
    public List<problems> gettiku(String lesson, String type)
    {
        return problemMapper.gettukubytype(lesson,type);
    }
    @ResponseBody
    @GetMapping("deletetiku")
    public String deletetiku(String details)
    {
        return "";
    }

    @ResponseBody
    @GetMapping("gettikutype")
    public List gettikutype()
    {
         return  problemMapper.gettikutype();
    }


}
