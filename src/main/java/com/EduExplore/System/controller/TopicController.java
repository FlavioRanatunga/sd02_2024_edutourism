package com.EduExplore.System.controller;

import com.EduExplore.System.model.ChatForum;
import com.EduExplore.System.service.ChatForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TopicController {

    @Autowired
    private ChatForumService chatForumService;

    @GetMapping("/topics")
    public List<ChatForum> getTopics() {
        return chatForumService.getAllChatForums(); // Ensure this method returns a list of ChatForum
    }
}