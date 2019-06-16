package com.ssm.service;

import com.ssm.dao.classMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class classService {
    @Autowired
    classMapper classMapper;
    List<Map<String, Object>> getclasslessongrade( String id,  String lesson,  String test,String stuid)
    {
        return  classMapper.getclasslessongrade(id,lesson,test,stuid);
    }

    List<Map<String, Object>> getclassavg( String lesson, String test)
    {
        return  classMapper.getclassavg(lesson,test);
    }

    List<Map<String, Object>> getstudentrank( String test,String classid)
    {
        return classMapper.getstudentrank(test,classid);
    }
}
