package com.lms.backend.student.certificate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate, String>, JpaSpecificationExecutor<Certificate> {
    long countByStudentId(String studentId);
}
