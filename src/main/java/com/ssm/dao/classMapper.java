package com.ssm.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;
@Mapper
public interface classMapper {

    List<Map<String, Object>> getclasslessongrade(@Param("id") String id, @Param("lesson") String lesson, @Param("test") String test,@Param("stuid") String stuid);

    List<Map<String, Object>> getclassavg(@Param("lesson") String lesson, @Param("test") String test);

    List<Map<String, Object>> getstudentrank(@Param("test") String test, @Param("classid") String classid);
}
