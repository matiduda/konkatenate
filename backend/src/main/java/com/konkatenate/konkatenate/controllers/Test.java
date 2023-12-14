package com.konkatenate.konkatenate.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test {

    @GetMapping("/hello")
    public String sayHelloWorld() {
        return "Hello World!";
    }

}
