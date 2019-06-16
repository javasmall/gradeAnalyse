package com.ssm.dao;

import com.ssm.bean.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface teacherMapper {

    boolean addtest(test_name test);
    boolean insearttestconfig(@Param("testname")String testname,@Param("lesson")String lesson,@Param("index")int index,
                              @Param("fullscore")int fullscore,@Param("point")String point,@Param("type")String type,@Param("school")String school);

    List<testPaperinfo>gettestpaperinfo(@Param("testname")String testname,@Param("lesson")String lesson);
    boolean inserttestpaper(test_paper test_paper);
    boolean insertscore( student_chengji chengji);
}
