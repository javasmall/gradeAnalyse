package com.ssm.controller;

import com.baidu.aip.ocr.AipOcr;
import com.ssm.es.Esteamplate;
import com.ssm.service.problemService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class OCRController {
    public static final String APP_ID = "15742445";
    public static final String API_KEY = "LXrztEOzQxfef66DLIDQYpIG";
    public static final String SECRET_KEY = "gbDodnochc8jYjlAHADDgyyas9mrlmkF";

    @Autowired
    private problemService problemService;
    @Autowired
    Esteamplate esteamplate;
    @ResponseBody
    @PostMapping("ocrimg")
    public Map<String, Object> ocrimg(MultipartFile file) throws IOException {

        String value= problemService.ocrimg(file);
        return  esteamplate.searchproblem("problem","tiku",value).toMap();

//        HashMap<String, String> options = new HashMap<String, String>();
//        options.put("language_type", "CHN_ENG");
////        options.put("detect_direction", "true");
////        options.put("detect_language", "true");
////        options.put("probability", "true");
//        AipOcr client=new AipOcr(APP_ID,API_KEY,SECRET_KEY);
//        byte [] bite=file.getBytes();
//        System.out.println(file.getName());
//        System.out.println(file.getOriginalFilename()+" "+file.getResource());
//        JSONObject jsonObject=client.basicGeneral(bite,options);
//
//        System.out.println(jsonObject.toString());
//        return jsonObject.toString();
    }

    @ResponseBody
    @PostMapping("ocring2")
    public Map<String,Object> ocring2(String text) throws IOException {
        return  esteamplate.searchproblem("problem","tiku",text).toMap();
    }
    @ResponseBody
    @PostMapping("ocring3")
    public String ocring3(String text) throws IOException {
        return  esteamplate.searchproblem("problem","tiku",text).toString();
    }
}
