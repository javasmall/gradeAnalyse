package com.ssm.controller;

import com.ssm.dao.informationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
public class returnInformationController {
    @Autowired
    informationMapper info;

    //
    @RequestMapping(value = "/getpoint", method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String, Object>> getpointIformation(String lesson) {
        return info.getkownpoint(lesson);
    }

    @RequestMapping(value = "/getclassid", method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String, Object>> getclassidList() {
        return info.getclassid();
    }

    @RequestMapping(value = "/getstudentid", method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String, Object>> getstudentid(String classid) {
        return info.getstudentid(classid);
    }

    @RequestMapping(value = "/getproblemstylebyid", method = RequestMethod.GET)//��ȡ����ŵ�����
    @ResponseBody
    public List<Map<String, Object>> getproblemstylebyid(int problemid, String lesson, String testname) {
        return info.getproblemstylebyid(problemid, lesson, testname);
    }

    @ResponseBody
    @RequestMapping(value = "/getstuInformation")
    public List<Map<String, Object>> getstuInformation(long stuid) {
        return info.getstuinfo(stuid);
    }

    @ResponseBody
    @RequestMapping(value = "/getquestype")
    public List<Map<String, Object>> getquestype(String lesson) {
        return info.getproblemtype(lesson);
    }

}
