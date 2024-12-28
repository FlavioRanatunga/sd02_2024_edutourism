package com.EduExplore.System.repository;

import com.EduExplore.System.model.ChatForum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@Repository
public interface ChatForumRepository  extends JpaRepository<ChatForum, Integer> {

    // ChatForum findById(int id);
}
