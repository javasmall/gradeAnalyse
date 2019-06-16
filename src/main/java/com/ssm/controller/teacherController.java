package com.ssm.controller;

import com.ssm.bean.testPaperinfo;
import com.ssm.bean.test_name;
import com.ssm.dao.teacherMapper;
import com.ssm.service.teacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("teacher")
public class teacherController {

    @Autowired
    teacherMapper teacherMapper;
    @Autowired
    teacherService teacherService;
    @ResponseBody
    @PostMapping("inserttest")
    public String inserttest(String testname)
    {
        try {
            String testschool = "just";
            int testyear = 2018;
            int testmonth = 3;
            test_name test_name = new test_name();
            test_name.setTestname(testname);
            test_name.setSchoolName(testschool);
            test_name.setTestMonth(testmonth);
            test_name.setTestYear(testyear);
            test_name.setTestType("周练");
            teacherMapper.addtest(test_name);
            return "添加成功";
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return "添加失败";
        }
    }
    @ResponseBody
    @PostMapping("addtestconfig")
    public boolean addtestconfig(String xueke,String testname,String point[])
    {
          String yuwen[]=new String[17];String math[]=new String[20];String english[]=new String[26];
          int yuwenscore[]={3,3,3,3,3,3,3,3,3,3,10,10,10,10,10,10,70};
          int mathscore[]={5,5,5,5,5,5,5,5,5,5,5,5,5,5,15,15,15,15,15,15};
          int englishscore[]={4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,20};
          for(int i=0;i<5;i++){yuwen[i]="基础";}
        for(int i=5;i<10;i++){yuwen[i]="文言文/诗歌";}
        for(int i=10;i<17;i++){yuwen[i]="阅读理解";}
        for(int i=0;i<14;i++){math[i]="填空";}
        for(int i=14;i<20;i++){math[i]="解答";}
        for(int i=0;i<20;i++){english[i]="选择";}
        for(int i=20;i<25;i++){english[i]="填空";}english[25]="写作";
        if(xueke.equals("数学"))
        {
           return teacherService.insearttestconfig(testname,xueke,mathscore,point,math,"just");
        }
        else if(xueke.equals("语文"))
        {
           return teacherService.insearttestconfig(testname,xueke,yuwenscore,point,yuwen,"just");
        }
        else{
          return  teacherService.insearttestconfig(testname,xueke,englishscore,point,english,"just");
        }


    }

    @ResponseBody
    @GetMapping ("/addstugrade")
    public boolean addstugrade(String testname,String lesson,long studnetid,int score[])
    {
           return teacherService.inseartstuscore(testname,lesson,studnetid,score);
    }


}
