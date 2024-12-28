package com.EduExplore.System.repository;


import com.EduExplore.System.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@Repository
public interface MessageRepository extends JpaRepository<ChatMessage, Integer> {
}
