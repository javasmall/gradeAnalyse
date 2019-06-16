package com.ssm.bean;

public class Class {
    private Integer id;

    private String classId;

    private String className;

    private String classTecherId;

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

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className == null ? null : className.trim();
    }

    public String getClassTecherId() {
        return classTecherId;
    }

    public void setClassTecherId(String classTecherId) {
        this.classTecherId = classTecherId == null ? null : classTecherId.trim();
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName == null ? null : schoolName.trim();
    }
}