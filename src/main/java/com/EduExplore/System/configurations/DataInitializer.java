package com.EduExplore.System.configurations;
import com.EduExplore.System.model.ChatForum;
import com.EduExplore.System.service.ChatForumService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    private final ChatForumService chatForumService;

    public DataInitializer(ChatForumService chatForumService) {
        this.chatForumService = chatForumService;
    }

    @Bean
    public CommandLineRunner initializeData() {
        return args -> {
            // Check if the chat forum with ID 0 exists
            if (chatForumService.findById(1) == null) {
                // Create and save a new ChatForum
                ChatForum chatForum = new ChatForum();
                chatForum.setChatRoomName("Transport Providers ChatRoom");
                // Do not set ID; let the database generate it
                chatForumService.saveChatForum(chatForum);
                System.out.println("Initialized default chat forum with ID 1");
            }
            if (chatForumService.findById(2) == null) {
                // Create and save a new ChatForum
                ChatForum chatForum = new ChatForum();
                chatForum.setChatRoomName("Event ChatRoom");
                // Do not set ID; let the database generate it
                chatForumService.saveChatForum(chatForum);
                System.out.println("Initialized default chat forum with ID 2");
            }
            if (chatForumService.findById(3) == null) {
                // Create and save a new ChatForum
                ChatForum chatForum = new ChatForum();
                chatForum.setChatRoomName("Hotels ChatRoom");
                // Do not set ID; let the database generate it
                chatForumService.saveChatForum(chatForum);
                System.out.println("Initialized default chat forum with ID 3");
            }
            if (chatForumService.findById(4) == null) {
                // Create and save a new ChatForum
                ChatForum chatForum = new ChatForum();
                chatForum.setChatRoomName("Course ChatRoom");
                // Do not set ID; let the database generate it
                chatForumService.saveChatForum(chatForum);
                System.out.println("Initialized default chat forum with ID 4");
            }
            if (chatForumService.findById(5) == null) {
                // Create and save a new ChatForum
                ChatForum chatForum = new ChatForum();
                chatForum.setChatRoomName("Travel Location ChatRoom");
                // Do not set ID; let the database generate it
                chatForumService.saveChatForum(chatForum);
                System.out.println("Initialized default chat forum with ID 5");
            }
            if (chatForumService.findById(6) == null) {
                // Create and save a new ChatForum
                ChatForum chatForum = new ChatForum();
                chatForum.setChatRoomName("Package Providers ChatRoom");
                // Do not set ID; let the database generate it
                chatForumService.saveChatForum(chatForum);
                System.out.println("Initialized default chat forum with ID 6");
            }
        };
    }
}
