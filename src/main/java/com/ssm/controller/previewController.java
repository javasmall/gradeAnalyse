package com.ssm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
public class previewController {

    @RequestMapping(value = "/preview")
    @ResponseBody
    public double getpreview(int list[], String sha) {
        List<Integer> list1 = new ArrayList<Integer>();
        for (int q : list) {
            list1.add(q);
        }
        double value = mintwo(list1);
        return value;
    }

    static double a = 0.0, b = 0.0;
    static int num = 0;

    @RequestMapping(value = "/status")
    @ResponseBody
    public double status(int list[]) {
        List<Integer> list1 = new ArrayList<Integer>();
        for (int q : list) {
            list1.add(q);
        }
        mintwo(list1);
        double status = a;
        return status;
    }

    private double mintwo(List<Integer> list) {
        double x[] = new double[list.size()];
        double y[] = new double[list.size()];
        int i = 0;
        for (i = 0; i < list.size(); i++) {
            x[i] = i;
            y[i] = list.get(i);
            System.out.println(x[i] + " " + y[i]);
        }
        train(x, y);
        System.out.println(a + " " + b);
        double value = predict((double) i);
        return value;
    }

    private static void train(double x[], double y[]) {
        num = x.length < y.length ? x.length : y.length;
        calCoefficientes(x, y);
    }

    private static void calCoefficientes(double x[], double y[]) {
        double xy = 0.0, xT = 0.0, yT = 0.0, xS = 0.0;
        for (int i = 0; i < num; i++) {
            xy += x[i] * y[i];
            xT += x[i];
            yT += y[i];
            xS += Math.pow(x[i], 2.0);
        }
        a = (num * xy - xT * yT) / (num * xS - Math.pow(xT, 2.0));
        b = yT / num - a * xT / num;
    }

    private static double predict(double xValue) {
        System.out.println("a=" + a);
        System.out.println("b=" + b);
        return a * xValue + b;
    }


}
