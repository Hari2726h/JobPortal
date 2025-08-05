package com.examly.springapp.exception;

public class JobNotfoundException extends RuntimeException{
    public JobNotfoundException(String msg){
        super(msg);
    }
}
