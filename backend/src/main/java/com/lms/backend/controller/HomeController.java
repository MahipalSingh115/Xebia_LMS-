package com.lms.backend.controller;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> home() {

        Map<String, Object> response = new LinkedHashMap<>();

        response.put("application", "Xebia LMS Backend");
        response.put("status", "RUNNING");
        response.put("version", "1.0.0");
        response.put("database", "CONNECTED");
        response.put("timestamp", LocalDateTime.now());

        response.put("apis", new String[]{
                "/api/categories",
                "/api/courses",
                "/api/modules",
                "/api/submodules",
                "/api/contents"
        });

        return response;
    }
}