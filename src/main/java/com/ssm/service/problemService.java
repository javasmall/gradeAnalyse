package com.ssm.service;

import com.baidu.aip.ocr.AipOcr;
import com.ssm.bean.problems;
import com.ssm.dao.problemMapper;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import static com.ssm.controller.OCRController.SECRET_KEY;

@Service
public class problemService {
    public static final String APP_ID = "15742445";
    public static final String API_KEY = "LXrztEOzQxfef66DLIDQYpIG";
    public static final String SECRET_KEY = "gbDodnochc8jYjlAHADDgyyas9mrlmkF";
    @Autowired
    problemMapper problemMapper;
    public boolean inserttiku(problems problems)
    {
        try {
            problemMapper.insertproblems(problems);
            return true;
        }catch (Exception e)
        {
        return false;
        }
    }
    public String ocrimg(MultipartFile file) throws IOException {
        HashMap<String, String> options = new HashMap<String, String>();
        options.put("language_type", "CHN_ENG");
        AipOcr client=new AipOcr(APP_ID,API_KEY,SECRET_KEY);
        byte [] bite=file.getBytes();
        System.out.println(file.getOriginalFilename()+" "+file.getResource());
        JSONObject jsonObject=client.basicGeneral(bite,options);
        System.out.println(jsonObject.toString());
        String value="";
        JSONArray jsonArray =jsonObject.getJSONArray("words_result");
        for(int i=0;i<jsonArray.length();i++)
        {
            JSONObject o=jsonArray.getJSONObject(i);
            value+=o.getString("words")+" ";
        }


        return value;
    }
}
