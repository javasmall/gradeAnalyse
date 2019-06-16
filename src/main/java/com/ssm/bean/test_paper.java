package com.ssm.bean;

public class test_paper {
    private Integer id;

    private String testName;

    private String paperLesson;

    private Long studentId;

    private Integer questionNumber;
    private Integer questionFullscore;
    private Integer questionScore;

    private String schoolName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTestName() {
        return testName;
    }

    public void setTestName(String testName) {
        this.testName = testName == null ? null : testName.trim();
    }

    public String getPaperLesson() {
        return paperLesson;
    }

    public void setPaperLesson(String paperLesson) {
        this.paperLesson = paperLesson == null ? null : paperLesson.trim();
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Integer getQuestionNumber() {
        return questionNumber;
    }

    public void setQuestionNumber(Integer questionNumber) {
        this.questionNumber = questionNumber;
    }

    public Integer getQuestionScore() {
        return questionScore;
    }

    public void setQuestionScore(Integer questionScore) {
        this.questionScore = questionScore;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName == null ? null : schoolName.trim();
    }

    public Integer getQuestionFullscore() {
        return questionFullscore;
    }

    public void setQuestionFullscore(Integer questionFullscore) {
        this.questionFullscore = questionFullscore;
    }
}