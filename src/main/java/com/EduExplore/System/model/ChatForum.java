package com.EduExplore.System.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class ChatForum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String chatRoomName;

//    @OneToMany(mappedBy = "chatForum", cascade = CascadeType.ALL, fetch = FetchType.LAZY)

    @OneToMany(mappedBy = "chatForum", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ChatMessage> messageList;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getChatRoomName() {
        return chatRoomName;
    }

    public void setChatRoomName(String chatRoomName) {
        this.chatRoomName = chatRoomName;
    }

    public List<ChatMessage> getMessageList() {
        return messageList;
    }

    public void setMessageList(List<ChatMessage> messageList) {
        this.messageList = messageList;
    }
}
