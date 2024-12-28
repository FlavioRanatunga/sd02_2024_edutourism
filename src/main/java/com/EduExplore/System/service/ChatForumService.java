package com.EduExplore.System.service;

import com.EduExplore.System.model.ChatForum;
import com.EduExplore.System.model.ChatMessage;

import java.util.List;

public interface ChatForumService {

    public ChatForum findById(int id);

    //public void addMessageToChatForum();

    public void saveChatForum(ChatForum chatForum);

    public ChatMessage saveChatMessage(int id, ChatMessage message);

    List<ChatForum> getAllChatForums();
    public void deleteChatMessage(int forumId, int messageId);
}
