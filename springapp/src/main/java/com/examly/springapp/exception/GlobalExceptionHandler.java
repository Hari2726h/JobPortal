package com.examly.springapp.exception;
import java.time.LocalDateTime;
import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(JobNotfoundException.class)
    public ResponseEntity<?> handleJobNotFoundException(JobNotfoundException ex){
        HashMap<String,Object> error=new HashMap<>();
        error.put("timestamp",LocalDateTime.now());
        error.put("status",HttpStatus.NOT_FOUND.value());
        error.put("message",ex.getMessage());
        return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntimeException(RuntimeException ex){
        HashMap<String,Object> error=new HashMap<>();
        error.put("timestamp",LocalDateTime.now());
        error.put("status",HttpStatus.NOT_FOUND.value());
        error.put("message",ex.getMessage());
        return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
    }

}
