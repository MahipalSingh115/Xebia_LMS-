package com.lms.backend.learning.student.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CertificateResponse {
    private String id;
    private String title;
    private String date;
    private String type;
    private List<String> tags;
}
