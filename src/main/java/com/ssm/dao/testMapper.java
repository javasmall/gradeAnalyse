package com.ssm.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;
@Mapper
public interface testMapper {
    List<Map<String, Object>> getpastlessonavg(@Param("id") long id, @Param("lesson") String lesson);

    List<Map<String, Object>> getpastrank(@Param("id") long id, @Param("type") String type);

    List<Map<String, Object>> getpastlessonrank(@Param("id") long id, @Param("lesson") String lesson, @Param("type") String type);

}
