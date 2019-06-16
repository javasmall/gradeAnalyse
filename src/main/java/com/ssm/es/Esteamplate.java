package com.ssm.es;

import com.ssm.bean.problems;
import org.elasticsearch.action.admin.indices.create.CreateIndexRequest;
import org.elasticsearch.action.admin.indices.create.CreateIndexResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
@Service
public class Esteamplate {
    @Autowired
    private RestHighLevelClient client;
    private void addindex(String index) throws IOException {
//
        CreateIndexRequest request = new CreateIndexRequest(index);
        CreateIndexResponse createIndexResponse = client.indices().create(request,     RequestOptions.DEFAULT);
        JSONObject jsonObject=new JSONObject(createIndexResponse);
        System.out.println("createIndex: " + jsonObject.toString());
    }
    public  void addproblems(String index, String type, problems problems) throws IOException {

        IndexRequest indexRequest=new IndexRequest(index,type,String.valueOf(problems.getId()));
        indexRequest.source((new JSONObject(problems)).toString(), XContentType.JSON);
        IndexResponse indexResponse=client.index(indexRequest,RequestOptions.DEFAULT);
        JSONObject jsonObject=new JSONObject(indexResponse);
        System.out.println("createIndex: " + jsonObject.toString());
    }

    public JSONObject searchproblem(String index, String type, String name) throws IOException {
        BoolQueryBuilder boolBuilder = QueryBuilders.boolQuery();
        boolBuilder.must(QueryBuilders.matchQuery("details", name)); // 这里可以根据字段进行搜索，must表示符合条件的，相反的mustnot表示不符合条件的
        // boolBuilder.must(QueryBuilders.matchQuery("id", tests.getId().toString()));

        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(boolBuilder);

        sourceBuilder.from(0);
        sourceBuilder.size(10); // 获取记录数，默认10
        //sourceBuilder.fetchSource(new String[] { "user", "title","desc" }, new String[] {}); // 第一个是获取字段，第二个是过滤的字段，默认获取全部
        SearchRequest searchRequest = new SearchRequest(index);
        searchRequest.types(type);
        searchRequest.source(sourceBuilder);
        SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
        System.out.println(new JSONObject(response).toString());
        return  new JSONObject(response);
    }
}
