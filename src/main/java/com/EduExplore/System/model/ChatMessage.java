package com.EduExplore.System.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Date;
import lombok.*;

//@NoArgsConstructor
//@AllArgsConstructor
//@Data
//@ToString
@Entity
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int messageId;

    private String messageText;
    private String messageSenderName;
    private String messageSenderId;
    private boolean isReply;
    private int replyMessageId;
    private List<Integer> replyMessageList;
    private LocalDateTime sentAt;
    private boolean fromTourist;

    @ManyToOne
    @JoinColumn(name = "chat_forum_id")
    @JsonBackReference
    private ChatForum chatForum;

    private int chatForumIdCode;

    public int getMessageId() {
        return messageId;
    }

    public void setMessageId(int messageId) {
        this.messageId = messageId;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public String getMessageSenderName() {
        return messageSenderName;
    }

    public void setMessageSenderName(String messageSenderName) {
        this.messageSenderName = messageSenderName;
    }

    public boolean isReply() {
        return isReply;
    }

    public void setReply(boolean reply) {
        isReply = reply;
    }

    public int getReplyMessageId() {
        return replyMessageId;
    }

    public void setReplyMessageId(int replyMessageId) {
        this.replyMessageId = replyMessageId;
    }

    public List<Integer> getReplyMessageList() {
        return replyMessageList;
    }

    public void setReplyMessageList(List<Integer> replyMessageList) {
        this.replyMessageList = replyMessageList;
    }

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }

    public boolean isFromTourist() {
        return fromTourist;
    }

    public void setFromTourist(boolean fromTourist) {
        this.fromTourist = fromTourist;
    }

    public ChatForum getChatForum() {
        return chatForum;
    }

    public void setChatForum(ChatForum chatForum) {
        this.chatForum = chatForum;
    }

    public String getMessageSenderId() {
        return messageSenderId;
    }

    public void setMessageSenderId(String messageSenderId) {
        this.messageSenderId = messageSenderId;
    }

    public int getChatForumIdCode() {
        return chatForumIdCode;
    }

    public void setChatForumIdCode(int chatForumIdCode) {
        this.chatForumIdCode = chatForumIdCode;
    }
}
