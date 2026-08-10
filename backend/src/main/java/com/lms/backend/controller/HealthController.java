package com.lms.backend.controller;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/health")
    public Map<String,Object> health(){

        return Map.of(
                "status","UP",
                "database","CONNECTED",
                "time",LocalDateTime.now()
        );
    }

}