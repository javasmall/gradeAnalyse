package com.ssm.bean;

public class Class_chengji {
    private Integer id;

    private String classId;

    private String lessionName;

    private Integer aveScore;

    private String schoolName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getClassId() {
        return classId;
    }

    public void setClassId(String classId) {
        this.classId = classId == null ? null : classId.trim();
    }

    public String getLessionName() {
        return lessionName;
    }

    public void setLessionName(String lessionName) {
        this.lessionName = lessionName == null ? null : lessionName.trim();
    }

    public Integer getAveScore() {
        return aveScore;
    }

    public void setAveScore(Integer aveScore) {
        this.aveScore = aveScore;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName == null ? null : schoolName.trim();
    }
}