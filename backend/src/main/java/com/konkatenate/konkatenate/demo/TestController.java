package com.konkatenate.konkatenate.demo;

import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    public ObjectMapper mapper;

    @GetMapping()
    public ObjectNode sayHello() {
        ObjectNode testObj = mapper.createObjectNode();
        testObj.put("info", "Hello world, this is backend speaking!");
        return testObj;
    }

}
