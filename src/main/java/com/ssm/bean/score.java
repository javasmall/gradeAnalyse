package com.ssm.bean;

public class score {
    private int id;
    private long student_id;
    private String lesson_name;
    private int lesson_score;
    private String class_id;
    private String test_name;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public long getStudent_id() {
        return student_id;
    }

    public void setStudent_id(long student_id) {
        this.student_id = student_id;
    }

    public String getLesson_name() {
        return lesson_name;
    }

    public void setLesson_name(String lesson_name) {
        this.lesson_name = lesson_name;
    }

    public int getLesson_score() {
        return lesson_score;
    }

    public void setLesson_score(int lesson_score) {
        this.lesson_score = lesson_score;
    }

    public String getClass_id() {
        return class_id;
    }

    public void setClass_id(String class_id) {
        this.class_id = class_id;
    }

    public String getTest_name() {
        return test_name;
    }

    public void setTest_name(String test_name) {
        this.test_name = test_name;
    }

    public String toString() {
        return "[" + student_id + " " + lesson_name + " " + lesson_score + " " + test_name + "]";


    }

}
