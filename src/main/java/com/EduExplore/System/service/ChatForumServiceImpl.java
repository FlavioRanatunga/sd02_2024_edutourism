package com.EduExplore.System.service;

import com.EduExplore.System.model.ChatForum;
import com.EduExplore.System.model.ChatMessage;
import com.EduExplore.System.repository.ChatForumRepository;
import com.EduExplore.System.repository.MessageRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.EduExplore.System.service.ServiceProviderImpl.logger;

@Service
public class ChatForumServiceImpl implements ChatForumService{
    @Autowired
    MessageRepository messageRepository; // Inject MessageRepository

    @Autowired
    ChatForumRepository chatForumRepository;
    @Override
    public ChatForum findById(int id) {
        ChatForum chatForum= chatForumRepository.findById(id).orElse(null);
        return chatForum;
    }

    @Override
    public void saveChatForum(ChatForum chatForum) {
        chatForumRepository.save(chatForum);
    }

    @Transactional
    @Override
    public ChatMessage saveChatMessage(int id, ChatMessage message) {
        ChatForum chatForum= chatForumRepository.findById(id).orElse(null);
        chatForum.getMessageList().add(message);
        ChatForum forum= chatForumRepository.save(chatForum);
        List<ChatMessage> messages = forum.getMessageList();

        // Assuming the latest message is the one we just added (the last one in the list)
        return messages.get(messages.size() - 1);

    }

    @Override
    public List<ChatForum> getAllChatForums() {
        return chatForumRepository.findAll(); // Ensure this method is available in your repository
    }

    @Override
    public void deleteChatMessage(int forumId, int messageId) {

        logger.info("Attempting to delete message with ID: {} from forum with ID: {}", messageId, forumId);

        ChatForum chatForum = chatForumRepository.findById(forumId).orElse(null);

        if (chatForum == null) {
            logger.error("ChatForum with ID {} not found.", forumId);
            return;
        }

        logger.info("ChatForum with ID {} found.", forumId);

        List<ChatMessage> messages = chatForum.getMessageList();

        // Find the message by its ID
        ChatMessage messageToDelete = messages.stream()
                .filter(message -> message.getMessageId() == messageId)
                .findFirst()
                .orElse(null);

        if (messageToDelete == null) {
            logger.error("Message with ID {} not found in forum with ID {}.", messageId, forumId);
            return;
        }

        logger.info("Message with ID {} found. Deleting from chat forum and database...",messageId);

        // Remove the message from the ChatForum's message list
        messages.remove(messageToDelete);

        // Save the updated ChatForum to persist the changes in the relationship
        chatForumRepository.save(chatForum);

        // Now delete the message from the chat_message table using the MessageRepository
        messageRepository.deleteById(messageId);

        logger.info("Message with ID {} deleted successfully from forum with ID {} and from the database.", messageId, forumId);
    }


}
