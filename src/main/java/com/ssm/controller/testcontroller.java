package com.ssm.controller;

import com.ssm.dao.testMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
public class testcontroller {
    @Autowired(required = true)
    private testMapper testmapper;

    @RequestMapping(value = "/pastlessonavg", method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String, Object>> pastlessonavg(long id, String lesson) {
        return testmapper.getpastlessonavg(id, lesson);
    }

    @RequestMapping(value = "/pastrank", method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String, Object>> pastrank(long id, String type) {
        return testmapper.getpastrank(id, type);
    }

    @RequestMapping(value = "/pastlessonrank", method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String, Object>> getpastlessonpastrank(long id, String lesson, String type) {
        return testmapper.getpastlessonrank(id, lesson, type);
    }
}