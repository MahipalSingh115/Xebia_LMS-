package com.lms.backend.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI lmsOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Xebia LMS API")
                        .version("v1.0")
                        .description("Learning Management System Backend APIs")
                        .contact(new Contact()
                                .name("Xebia Team"))
                        .license(new License()
                                .name("Internal")))
                .externalDocs(new ExternalDocumentation()
                        .description("Project Documentation"));
    }
}