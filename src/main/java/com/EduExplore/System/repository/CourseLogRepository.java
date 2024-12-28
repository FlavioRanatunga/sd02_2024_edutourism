package com.EduExplore.System.repository;

import com.EduExplore.System.model.CourseLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseLogRepository extends JpaRepository<CourseLog, Long> {
    // You can define custom query methods if needed
}
