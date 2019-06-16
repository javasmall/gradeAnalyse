package com.ssm.controller;

import com.ssm.bean.score;
import com.ssm.dao.scoreMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Controller
public class scorecontroller {

    @Autowired(required = true)
    private scoreMapper scoremapper;

    @RequestMapping(value = "/score", method = RequestMethod.GET)
    @ResponseBody
    public List<score> score() {
        return scoremapper.findAll();
    }

    //����ѧ���÷����
    @RequestMapping(value = "/studentscore", method = RequestMethod.GET)
    @ResponseBody
    public List<score> studentscore(String id, String lesson) {

        return scoremapper.findbyid(Long.parseLong(id), lesson);
    }


    @GetMapping("/getproblemscorebystuid")
    @ResponseBody
    public List<Map<String,Object>>getproblemscorebystuid(String lesson,long studentid,String testname)
    {
        return scoremapper.getproblemscorebystuid(lesson,studentid,testname);
    }

    //������Ŀ�ĵ÷����
    @RequestMapping(value = "/getproblemscore", method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String, Object>> studentrank(String lesson, long classid, int index, String test) {
        return scoremapper.getproblemscore(lesson, classid, index, test);
    }

    @RequestMapping(value = "/getwaproblem", method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String, Object>> getwrongcount(long id, double pecent, String test, String lesson) {
        return scoremapper.getwacount(id, pecent, test, lesson);

    }

    @RequestMapping(value = "/getscorebypoint")
    @ResponseBody
    public List<Map<String, Object>> getscorebypoint(String testname, long stuid, String lessonname) {
        return scoremapper.getscorebypoint(testname, stuid, lessonname);
    }

    @RequestMapping(value = "/getscorebytype")
    @ResponseBody
    public List<Map<String, Object>> getscorebytype(String testname, long stuid, String lessonname) {
        return scoremapper.getscorebytype(testname, stuid, lessonname);
    }

    /*
    ������Ҫ����
     */
    @RequestMapping(value = "/getmosterrorbypoint")
    @ResponseBody
    public List<Map<String, Object>> getmosterrorbypoint(String testname, String lesson, String stuid) {
        int id = 1;
        if (testname != null) {
            String num = testname.substring(testname.length() - 2);
            if (testname.charAt(0) < '0' || testname.charAt(2) > '9') {
                num = num.substring(1);
            }
            id = Integer.parseInt(num);//
        }
        List<String> list = new ArrayList<String>();
        for (int i = 0; i < id; i++) {
            list.add("test" + (i + 1));
            System.out.println(list.get(i));
        }
        return scoremapper.getmosterrorbypoint(list, lesson, Long.parseLong(stuid), list.size());
    }

    @RequestMapping(value = "/getmosterrorbytype")
    @ResponseBody
    public List<Map<String, Object>> getmosterrorbytype(String testname, String lesson, String stuid) {
        int num = Integer.parseInt(testname.substring(testname.length() - 1));
        List<String> list = new ArrayList<String>();
        for (int i = 0; i < num; i++) {
            list.add("test" + (i + 1));
            System.out.println(list.get(i));
        }
        return scoremapper.getmosterrorbytype(list, lesson, Long.parseLong(stuid), list.size());
    }
//	 @RequestMapping(value = "/score", method = RequestMethod.GET)
//	   public  String score( ModelMap model) {
//		 model.addAttribute("score", scoremapper.findAll().get(0));
//		return "index";	     
//	   }	 
}
