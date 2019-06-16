package com.ssm.dao;

import com.ssm.bean.error_collection;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
@Mapper
public interface errorCollectionMapper {
    List<error_collection> selecterrorcollection(@Param("studentid") long studentid, @Param("school") String school
            , @Param("lesson") String lesseon, @Param("point") String point);

    boolean inserterrorproblem(error_collection error);

    boolean deleteWrongProblem(String imgurl);

}
