package com.ssm.bean;

public class error_collection {
    private long student_id;
    private String test_name;
    private String lesson_name;
    private int problem_id;
    private String school_name;
    private String kownledge_point;
    private String img_url;
    private String uploadtime;

    public void setUploadtime(String uploadtime) {
        this.uploadtime = uploadtime;
    }

    public String getUploadtime() {
        return uploadtime;
    }

    public long getStudent_id() {
        return student_id;
    }

    public void setStudent_id(long student_id) {
        this.student_id = student_id;
    }

    public String getTest_name() {
        return test_name;
    }

    public void setTest_name(String test_name) {
        this.test_name = test_name;
    }

    public String getLesson_name() {
        return lesson_name;
    }

    public void setLesson_name(String lesson_name) {
        this.lesson_name = lesson_name;
    }

    public int getProblem_id() {
        return problem_id;
    }

    public void setProblem_id(int problem_id) {
        this.problem_id = problem_id;
    }

    public String getSchool_name() {
        return school_name;
    }

    public void setSchool_name(String school_name) {
        this.school_name = school_name;
    }

    public String getImg_url() {
        return img_url;
    }

    public void setImg_url(String img_url) {
        this.img_url = img_url;
    }

    public String getKownledge_point() {
        return kownledge_point;
    }

    public void setKownledge_point(String kownledge_point) {
        this.kownledge_point = kownledge_point;
    }

}
