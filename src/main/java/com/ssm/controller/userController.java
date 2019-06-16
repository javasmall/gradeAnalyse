package com.ssm.controller;

import com.ssm.bean.login;
import com.ssm.bean.users;
import com.ssm.dao.informationMapper;
import com.ssm.dao.userMapper;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Controller
public class userController {
    @Autowired(required = false)
    private informationMapper infoma;//判断以及返回信息
    @Autowired(required = false)
    private userMapper usermapper;


    @RequestMapping(value = "teacherlogin")
    public String teacherlogin(HttpServletRequest request, HttpServletResponse response)
    {
        try {
            String name = request.getParameter("name");
            String password = request.getParameter("password");
            Subject subject = SecurityUtils.getSubject();

            //2.封装用户数据
            UsernamePasswordToken token = new UsernamePasswordToken(name, password);

            //3.执行登录方法
            try {
                subject.login(token);

                login login = usermapper.getrole(name);
                //登录成功
                //跳转到test.html
                String classid = String.valueOf(login.getRoleidnumber());
                Cookie cookie = new Cookie("studentId", classid);//创建新cookie
                response.addCookie(cookie);
                return "redirect:Teacher/htmlFiles/index_teacher.html";
            } catch (UnknownAccountException e) {
                //e.printStackTrace();
                //登录失败:用户名不存在

                return "redirect:login_teacher.html";
            } catch (IncorrectCredentialsException e) {
                //e.printStackTrace();
                //登录失败:密码错误
                return "redirect:login_teacher.html";
            }
        }
        catch (Exception e)
        {
            return "redirect:login_teacher.html";
        }
    }

    @RequestMapping(value = "/stulogin")
    public String login(HttpServletRequest request, HttpServletResponse response) {
        try {
            String name = request.getParameter("username");
            String password = request.getParameter("password");
            Subject subject = SecurityUtils.getSubject();

            //2.封装用户数据
            UsernamePasswordToken token = new UsernamePasswordToken(name, password);

            //3.执行登录方法
            try {
                subject.login(token);

                login login = usermapper.getrole(name);
                //登录成功
                //跳转到test.html
                String stuid = String.valueOf(login.getRoleidnumber());
                Cookie cookie = new Cookie("studentId", stuid);//创建新cookie
                response.addCookie(cookie);
                return "redirect:Student/htmlFiles/index_student.html";
            } catch (UnknownAccountException e) {
                //e.printStackTrace();
                //登录失败:用户名不存在

                return "redirect:login_student.html";
            } catch (IncorrectCredentialsException e) {
                //e.printStackTrace();
                //登录失败:密码错误
                return "redirect:login_student.html";
            }
        }
        catch (Exception e)
        {
            return "redirect:login_student.html";
        }

    }


    @RequestMapping(value = "/insertuser")
    public String insertuser(HttpServletRequest request) {
        try {
        String count = request.getParameter("username");
        String password = request.getParameter("password");
        String phone = request.getParameter("phonenum");
        String studentid = request.getParameter("studentid");
        if(count.trim().equals("")||password.trim().equals("")||phone.trim().equals("")||studentid.trim().equals(""))
            return "redirect:register.html";
        if (count != null && password != null && studentid != null) {
            System.out.println(count + " " + password + " " + phone + " " + studentid + " ");
            System.out.println(usermapper.selectbyid(Long.parseLong(studentid)).size());
            System.out.println(usermapper.selectbyuser(count).size());

            if (usermapper.selectbyid(Long.parseLong(studentid)).size() == 0 && usermapper.selectbyuser(count).size() == 0 && infoma.getstuinfo(Long.parseLong(studentid)).size() != 0) {
                users user = new users();
                user.setCount(count);
                user.setPassword(password);
                user.setPhoneNumber(Long.parseLong(phone));
                user.setStudentid(Long.parseLong(studentid));
                user.setSchoolName("just");

                usermapper.insert(user);
                return "redirect:login.html";
            }
        }
        return "redirect:register.html";
        }
        catch (Exception e)
        {
            return "redirect:register.html";
        }
    }
}
