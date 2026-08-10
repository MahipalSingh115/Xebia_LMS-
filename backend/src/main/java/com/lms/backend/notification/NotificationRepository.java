package com.lms.backend.notification;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, String> {
    
    Page<Notification> findByRecipientRoleAndRecipientId(String role, String userId, Pageable pageable);
    
    Page<Notification> findByRecipientRoleAndRecipientIdAndCategory(String role, String userId, String category, Pageable pageable);
    
    long countByRecipientRoleAndRecipientIdAndIsRead(String role, String userId, boolean isRead);
    
    @Modifying
    @Query("UPDATE Notification n SET n.isRead = true WHERE n.recipientRole = :role AND n.recipientId = :userId")
    void markAllAsRead(@Param("role") String role, @Param("userId") String userId);
}
