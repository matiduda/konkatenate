package com.konkatenate.konkatenate.Test;

import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class TestController {

    @GetMapping("/api/ping")
    public Map<String, String> test() {
        HashMap<String, String> map = new HashMap<>();
        map.put("message", "PONG");
        return map;
    }
}
