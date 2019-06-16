package com.ssm.dao;

import com.ssm.bean.login;
import com.ssm.bean.users;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;
@Mapper
public interface userMapper {

    public boolean insert(users user);

    public boolean update(users user);

    public  List<Map<String,Object>> getteacherbyname(String username);

    public List<Map<String, Object>> selectbyuser(String username);

    public List<Map<String, Object>> selectbyid(Long studentid);

    @Select("select * from login where username=#{username}")
    login getrole(String username);

}
