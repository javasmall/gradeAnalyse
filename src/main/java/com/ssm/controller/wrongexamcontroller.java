package com.ssm.controller;

import com.ssm.bean.error_collection;
import com.ssm.dao.errorCollectionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

@Controller
public class wrongexamcontroller {
    @Autowired(required = true)
    private errorCollectionMapper errorco;

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index() {

        return "index";
    }
    //查询操作 所有错题

    @RequestMapping(value = "/geterrorcollection", method = RequestMethod.GET)
    @ResponseBody
    public List<error_collection> geterror_collection(String school, long id, String lesson, String point) {
        return errorco.selecterrorcollection(id, school, lesson, point);
    }

    /*
     * 上传错题集的操作
     */
    @ResponseBody
    @RequestMapping(value = "/onfile", method = RequestMethod.POST)
    public String uploadfile(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
       try {
           HttpSession session = request.getSession();
           request.setCharacterEncoding("UTF-8");//防止乱码，一定要有
           response.setCharacterEncoding("GBK");
           Part part = request.getPart("file");//名称
           String studentid = request.getParameter("studentid");//通过学号查找学生
           String test_name = request.getParameter("testname");//第几次ceshi
           String lesson = request.getParameter("lesson");//语数外
           String num = request.getParameter("numid");//题目号码
           String kownpoint = request.getParameter("kownpoint");//知识点
           String school = request.getParameter("school");
           String fileadress = lesson + "/" + studentid + "/" + num + test_name + "/";//规则
           System.out.println(fileadress);
           error_collection ecltion = new error_collection();
           Calendar cal = Calendar.getInstance();
           String time = new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime());
           ecltion.setUploadtime(time);
           ecltion.setStudent_id(Long.parseLong(studentid));
           ecltion.setSchool_name(school);
           ecltion.setLesson_name(lesson);
           ecltion.setProblem_id(Integer.parseInt(num));
           ecltion.setTest_name(test_name);
           ecltion.setKownledge_point(kownpoint);
           upload(part, session, fileadress, ecltion);//下载文件
           return "上传成功";
       }catch (Exception e)
       {
           e.printStackTrace();
           return "上传失败";
       }

    }

    public String getname(Part part)//获取名称
    {
        String contentdisposition = part.getHeader("content-disposition");//form-data; name="file"; filename="jsp学习.txt"
        String[] filename = contentdisposition.split("=");//分隔
        String filename1 = filename[filename.length - 1];//"jsp学习.txt"
        String filename2 = filename1.replace("\"", "");
        return filename2;
    }

    public void upload(Part part, HttpSession session, String fileadress, error_collection ecltion) throws IOException {

        String path = session.getServletContext().getRealPath("errorcollection/");//专门创建一个fileget文件夹存取内容
        path += fileadress;
        //System.out.println(path);
        File file = new File(path);
        String abluteadress = "errorcollection/" + fileadress + getname(part);//存储地址
        ecltion.setImg_url(abluteadress);//绝对地址
        errorco.inserterrorproblem(ecltion);//插入操作
        if (!file.exists())//不存在就新建文件夹
        {
//	    		if(!file.getParentFile().exists())
//	    		{
//	    			file.getParentFile().mkdirs();
//	    		}
            file.mkdirs();//创建整个目录

        }
        File file2 = new File(file, getname(part));//创建文件
        if (!file2.exists()) {
            file2.createNewFile();
        }
        InputStream in = part.getInputStream();
        OutputStream out = new FileOutputStream(file2);
        BufferedInputStream buf = new BufferedInputStream(in);
        BufferedOutputStream bufout = new BufferedOutputStream(out);
        byte by[] = new byte[1024 * 10];
        int q = 0;
        while ((q = buf.read(by)) != -1) {
            bufout.write(by);
            //by=new byte[1024]

        }
        bufout.close();
        buf.close();
        in.close();
        out.close();
    }

    @RequestMapping(value = "delete", method = RequestMethod.GET)
    public String delete(String imgurl, HttpServletRequest request) {
        HttpSession session = request.getSession();
        String fullFileName = session.getServletContext().getRealPath(imgurl);  //获取绝对路径
        System.out.println(fullFileName);
        File file = new File(fullFileName);
        if (file.isFile() || file.exists()) {
            file.delete();
        }
        errorco.deleteWrongProblem(imgurl);

        return null;
    }

}
