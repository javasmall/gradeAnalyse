package com.ssm.service;

import com.ssm.bean.testPaperinfo;
import com.ssm.bean.test_paper;
import com.ssm.dao.teacherMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class teacherService {

    @Autowired
    teacherMapper teacherMapper;
    @Transactional
    public  boolean insearttestconfig(String test_name, String lesson,int score[],  String point[], String type[], String school)
    {
        try {
            for (int i = 0; i < point.length; i++) {
                teacherMapper.insearttestconfig(test_name, lesson, i + 1, score[i], point[i], type[i], school);
            }
            return true;
        }
        catch (Exception e)
        {
            return  false;
        }
    }
    @Transactional
    public boolean inseartstuscore(String testname,String lesson,long studentid,int score[])
    {
        try {
            int count=0;
            List<testPaperinfo> list = teacherMapper.gettestpaperinfo(testname, lesson);
            for (int i = 0; i < list.size(); i++) {
                test_paper test_paper = new test_paper();
                test_paper.setPaperLesson(lesson);
                test_paper.setTestName(testname);
                test_paper.setStudentId(studentid);
                test_paper.setQuestionNumber(i + 1);
                test_paper.setQuestionFullscore(list.get(i).getQuestionFullscore());
                test_paper.setQuestionScore(score[i]);count+=score[i];
                test_paper.setSchoolName("just");
            }
            return true;
        }catch (Exception e)
        {return  false;}
    }
}
