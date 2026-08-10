package com.lms.backend.notification;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@SuppressWarnings("null")
public class NotificationService {
    
    private final NotificationRepository repository;

    public NotificationService(NotificationRepository repository) {
        this.repository = repository;
    }

    public Notification createNotification(String recipientId, String recipientRole, String category, String icon, String title, String description) {
        Notification notification = Notification.builder()
                .id("n_" + UUID.randomUUID().toString().replace("-", ""))
                .recipientId(recipientId)
                .recipientRole(recipientRole.toLowerCase())
                .category(category.toLowerCase())
                .icon(icon)
                .title(title)
                .description(description)
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .build();
        return repository.save(notification);
    }

    @Transactional(readOnly = true)
    public Page<Notification> getNotifications(String role, String userId, String category, Pageable pageable) {
        if (category != null && !category.trim().isEmpty() && !"all".equalsIgnoreCase(category)) {
            return repository.findByRecipientRoleAndRecipientIdAndCategory(role.toLowerCase(), userId, category.toLowerCase(), pageable);
        }
        return repository.findByRecipientRoleAndRecipientId(role.toLowerCase(), userId, pageable);
    }

    @Transactional(readOnly = true)
    public long getUnreadCount(String role, String userId) {
        return repository.countByRecipientRoleAndRecipientIdAndIsRead(role.toLowerCase(), userId, false);
    }

    public Optional<Notification> markAsRead(String id) {
        return repository.findById(id).map(n -> {
            n.setRead(true);
            return repository.save(n);
        });
    }

    public void markAllRead(String role, String userId) {
        repository.markAllAsRead(role.toLowerCase(), userId);
    }
    
    public void deleteNotification(String id) {
        repository.deleteById(id);
    }
}
