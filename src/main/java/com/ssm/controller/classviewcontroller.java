package com.ssm.controller;

import com.ssm.dao.classMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
public class classviewcontroller {
    @Autowired(required = true)
    private classMapper classMapper;

    @RequestMapping(value = "/classlessonscore", method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String, Object>> classlessonscore(String id, String lesson, String test,String stuid) {
        return classMapper.getclasslessongrade(id, lesson, test,stuid);
    }

    @RequestMapping(value = "/classavgscore", method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String, Object>> classavgscore(String lesson, String test) {
        return classMapper.getclassavg(lesson, test);
    }

    @RequestMapping(value = "/studentrank", method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String, Object>> studentrank(String test, String classid) {

        //if(classid!=null){}
        return classMapper.getstudentrank(test, classid);
    }

}
