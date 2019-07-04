package com.ssm.service;

import com.ssm.dao.testMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class testService {


    @Autowired(required = false)
    testMapper testmapper;
    @Cacheable(value = "pastrank",key = "#id+#type")
    public List<Map<String, Object>> getpastrank(long id, String type) {
        return testmapper.getpastrank(id, type);
    }
    @Cacheable(value = "getpastlessonrank",key = "#id+#lesson+#type")
    public List<Map<String, Object>> getpastlessonrank(long id, String lesson, String type) {
        return testmapper.getpastlessonrank(id, lesson, type);
    }
}
