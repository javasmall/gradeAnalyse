package com.ssm.bean;

public class test_name {
    private Integer id;

    private String testname;

    private String schoolName;

    private Integer testYear;

    private Integer testMonth;
    private  String testType;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTestname() {
        return testname;
    }

    public void setTestname(String testname) {
        this.testname = testname == null ? null : testname.trim();
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName == null ? null : schoolName.trim();
    }

    public Integer getTestYear() {
        return testYear;
    }

    public void setTestYear(Integer testYear) {
        this.testYear = testYear;
    }

    public Integer getTestMonth() {
        return testMonth;
    }

    public void setTestMonth(Integer testMonth) {
        this.testMonth = testMonth;
    }

    public String getTestType() {
        return testType;
    }

    public void setTestType(String testType) {
        this.testType = testType;
    }
}