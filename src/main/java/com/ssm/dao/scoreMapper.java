package com.ssm.dao;

import com.ssm.bean.score;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;
@Mapper
public interface scoreMapper {
    boolean save(score score);

    boolean update(score score);

    boolean delete(score score);

    List<score> findbyid(@Param("id") long id, @Param("lesson") String lesson);

    List<score> findAll();

    List<Map<String, Object>> getproblemscore(@Param("lesson") String lesson, @Param("classid") long classid,
                                              @Param("index") int index, @Param("test") String test);
    List<Map<String,Object>>getproblemscorebystuid(@Param("lesson") String lesson, @Param("studentid") long studentid,
                                                    @Param("testname") String testname);
    List<Map<String, Object>> getwacount(@Param("id") long id, @Param("percent") double pecent,
                                         @Param("test") String test, @Param("lesson") String lesson);

    List<Map<String, Object>> getscorebypoint(@Param("testname") String testname, @Param("stuid") long stuid, @Param("lessonname") String lessonname);

    List<Map<String, Object>> getscorebytype(@Param("testname") String testname, @Param("stuid") long stuid, @Param("lessonname") String lessonname);

    List<Map<String, Object>> getmosterrorbypoint(@Param("list") List<String> list, @Param("lesson") String lesson, @Param("stuid") long stuid, @Param("num") int num);

    List<Map<String, Object>> getmosterrorbytype(@Param("list") List<String> list, @Param("lesson") String lesson, @Param("stuid") long stuid, @Param("num") int num);

}
