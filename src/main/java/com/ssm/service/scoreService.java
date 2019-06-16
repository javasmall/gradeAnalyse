package com.ssm.service;

import com.ssm.bean.score;
import com.ssm.dao.scoreMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class scoreService {
    @Autowired
    scoreMapper scoreMapper;

    boolean save(score score){
       return scoreMapper.save(score);
    }

    boolean update(score score){return  scoreMapper.update(score);}

    boolean delete(score score){return  scoreMapper.delete(score);}

    List<score> findbyid( long id,  String lesson)
    {return scoreMapper.findbyid(id,lesson);}

    List<score> findAll()
    {return scoreMapper.findAll();}

    @CacheEvict(value = "problemscore")
   public List<Map<String, Object>> getproblemscore(String lesson, long classid, int index,  String test)
    {return  scoreMapper.getproblemscore(lesson,classid,index,test);}

    List<Map<String, Object>> getwacount( long id,  double pecent, String test,  String lesson)
    {return  scoreMapper.getwacount(id,pecent,test,lesson);}

    List<Map<String, Object>> getscorebypoint( String testname,  long stuid,  String lessonname)
    {
        return scoreMapper.getscorebypoint(testname,stuid,lessonname);
    }

    List<Map<String, Object>> getscorebytype( String testname,  long stuid,  String lessonname)
    {return scoreMapper.getscorebytype(testname,stuid,lessonname);}

    List<Map<String, Object>> getmosterrorbypoint( List<String> list,  String lesson,  long stuid, @Param("num") int num)
    {return  scoreMapper.getmosterrorbypoint(list, lesson, stuid, num);}

    List<Map<String, Object>> getmosterrorbytype(List<String> list,  String lesson,  long stuid,  int num)
    {return scoreMapper.getmosterrorbytype(list, lesson, stuid, num);}

}
