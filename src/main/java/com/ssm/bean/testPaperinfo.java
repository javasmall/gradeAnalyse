package com.ssm.bean;

public class testPaperinfo {
    private  int id;
    private  String testName;
    private  String paperLesson;
    private  int questionIndex;
    private  int questionFullscore;
    private  String questionKownledge;
    private String titleNumbertype;
    private  String schoolName;

    public testPaperinfo(int id, String testName, String paperLesson, int questionIndex, int questionFullscore, String questionKownledge, String titleNumbertype, String schoolName) {
        this.id = id;
        this.testName = testName;
        this.paperLesson = paperLesson;
        this.questionIndex = questionIndex;
        this.questionFullscore = questionFullscore;
        this.questionKownledge = questionKownledge;
        this.titleNumbertype = titleNumbertype;
        this.schoolName = schoolName;
    }

    public String getTestName() {
        return testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public String getPaperLesson() {
        return paperLesson;
    }

    public void setPaperLesson(String paperLesson) {
        this.paperLesson = paperLesson;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getQuestionIndex() {
        return questionIndex;
    }

    public void setQuestionIndex(int questionIndex) {
        this.questionIndex = questionIndex;
    }

    public int getQuestionFullscore() {
        return questionFullscore;
    }

    public void setQuestionFullscore(int questionFullscore) {
        this.questionFullscore = questionFullscore;
    }

    public String getQuestionKownledge() {
        return questionKownledge;
    }

    public void setQuestionKownledge(String questionKownledge) {
        this.questionKownledge = questionKownledge;
    }

    public String getTitleNumbertype() {
        return titleNumbertype;
    }

    public void setTitleNumbertype(String titleNumbertype) {
        this.titleNumbertype = titleNumbertype;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }
}
