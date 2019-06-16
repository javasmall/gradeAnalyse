package com.ssm.dao;

import com.ssm.bean.problems;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface problemMapper {

    public boolean insertproblems(problems promlems);
    public List<problems>gettukubytype(@Param("lesson")String lesson,@Param("point")String point);
    public  boolean deleteproblem(String details);
    public  List<String> gettikutype();
}
