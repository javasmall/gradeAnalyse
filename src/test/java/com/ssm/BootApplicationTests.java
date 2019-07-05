package com.ssm;

import com.ssm.bean.problems;
import com.ssm.bean.student_chengji;
import com.ssm.bean.test_paper;
import com.ssm.bean.wangyiwhite;
import com.ssm.dao.problemMapper;
import com.ssm.dao.teacherMapper;
import com.ssm.es.Esteamplate;
import com.ssm.service.teacherService;
import org.elasticsearch.action.admin.indices.create.CreateIndexRequest;
import org.elasticsearch.action.admin.indices.create.CreateIndexResponse;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;
import org.json.JSONObject;
import org.json.JSONString;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BootApplicationTests {


//    @Autowired(required = false)
//    private StringRedisTemplate stringRedisTemplate;
//    @Autowired
//    teacherMapper teacherMapper;
//    @Autowired
//    teacherService teacherService;
//    @Autowired
//    problemMapper problemMapper;
//    @Autowired(required = false)
//    private RedisTemplate<String, Serializable> redisTemplate;
    @Test
    public void contextLoads() {
//        stringRedisTemplate.opsForValue().set("66","55");
//        stringRedisTemplate.opsForSet().add("s","5");
//        stringRedisTemplate.opsForSet().add("s","44");
//        System.out.println(redisTemplate.opsForValue().get("66"));
    }
    @Autowired(required = false)
    RedisTemplate redisTemplate;
    @Test
    public  void test2()
    {
        wangyiwhite wangyiwhite=new wangyiwhite("162222","555");
        redisTemplate.opsForHash().put("wangyi","wang",wangyiwhite);
    }
//
//    @Test
//    public void test3()
//    {
//        String a[]={"55","55","55"};int b[]={44,44,44};
//        String c[]={"66,66","66","66"};int d[]={1,2,3};
//        teacherService.insearttestconfig("test7","chiines",b,a,c,"just");
//    }
//    @Test
//    public void test4()
//    {
//        test_paper test_paper=new test_paper();
//        test_paper.setPaperLesson("语文");
//        test_paper.setQuestionNumber(16);
//        teacherMapper.inserttestpaper(test_paper);
//    }
//    @Test
//    public  void test5()
//    {
//        student_chengji student_chengji=new student_chengji();
//
//    }
//    @Test
//    public  void test6()
//    {
////        problems problems=new problems("应用","66","just","dgda","gdsgs");
////        problemMapper.insertproblems(problems);
//    }
//
//    @Autowired(required = false)
//    private RestHighLevelClient client;
//    //@Test
//    //public void test7() throws IOException {
////        String index="problem";String type="tiku";
////        problems problems=new problems("数学","几何","","just","www.sda.com");
////        problems.setDetails("（本小题满分16分）已知定点，圆C：，\n" +
////                "（1）过点向圆C引切线，求切线长；\n" +
////                "（2）过点作直线交圆C于，且，求直线的斜率；\n" +
////                "（3）定点在直线上，对于圆C上任意一点R都满足，试求两点的坐标.");
////        IndexRequest indexRequest=new IndexRequest(index,type,"no1");
////        indexRequest.source((new JSONObject(problems)).toString(), XContentType.JSON);
////        IndexResponse indexResponse=client.index(indexRequest,RequestOptions.DEFAULT);
//
////        CreateIndexRequest request = new CreateIndexRequest(index);
////        CreateIndexResponse createIndexResponse = client.indices().create(request,     RequestOptions.DEFAULT);
////        JSONObject jsonObject=new JSONObject(indexResponse);
////        System.out.println("createIndex: " + jsonObject.toString());
//
//
//   // }
////    @Test
////    public  void test8() throws IOException {
////        String index="problem";String type="tiku";
////        GetRequest getRequest=new GetRequest(index,type,"no1");
////        GetResponse getResponse=client.get(getRequest,RequestOptions.DEFAULT);
////
////        System.out.println(new JSONObject(getResponse.getSource()).toString());
////    }
////    @Autowired
////    Esteamplate esteamplate;
////    @Test
////    public  void test9() throws IOException {
////        String index="acounts";
////        String type="person";
////        String va="管理";
////        esteamplate.searchproblem(index,type,va);
////
////    }
}
