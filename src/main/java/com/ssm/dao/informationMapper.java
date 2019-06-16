package com.ssm.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;
@Mapper
public interface informationMapper {
    List<Map<String, Object>> getkownpoint(String lesson);

    List<Map<String, Object>> getclassid();

    List<Map<String, Object>> getstudentid(String classid);

    List<Map<String, Object>> getproblemstylebyid(@Param("problemid") int problemid
            , @Param("lesson") String lesson, @Param("testname") String testname);

    List<Map<String, Object>> getstuinfo(long id);

    List<Map<String, Object>> getproblemtype(String lesson);

}
