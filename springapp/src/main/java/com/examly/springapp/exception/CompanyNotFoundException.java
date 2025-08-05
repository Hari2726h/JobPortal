package com.examly.springapp.exception;

public class CompanyNotFoundException extends RuntimeException {
    public CompanyNotFoundException(String msg){
        super(msg);
    }
}
