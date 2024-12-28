package com.EduExplore.System.controller;

import com.EduExplore.System.model.ChatForum;
import com.EduExplore.System.model.ChatMessage;
import com.EduExplore.System.model.ServiceProvider;
import com.EduExplore.System.service.ChatForumService;
import com.EduExplore.System.service.ServiceProviderService;
import com.google.api.client.util.DateTime;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Controller
@RestController
@RequestMapping("/chatMessage")
@CrossOrigin
public class ChatMessageController {

    @Autowired
    private ChatForumService chatForumService;

    @Autowired
    private ServiceProviderService serviceProviderService;

    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/messages/{roomId}")
    public ChatMessage sendMessage( @DestinationVariable String roomId,@Payload ChatMessage message){
//        Logger logger = null;
//        logger.info("Sending message: " + message);
        System.out.println("room Id"+roomId);
        System.out.println("message sending "+message);
        message.setSentAt(LocalDateTime.now());
       ChatForum chatForum= chatForumService.findById(Integer.valueOf(roomId));
       message.setChatForum(chatForum);
//        ServiceProvider serviceProvider = serviceProviderService.getServiceProviderDetailsById(message.getMessageSenderId());
//        message.setMessageSenderName(serviceProvider.getUsername());
        // Set the isReply field based on the presence of replyMessageId
        if (message.getReplyMessageId() > 0) {
            message.setReply(true);
        } else {
            message.setReply(false);
        }

        ChatMessage message1= chatForumService.saveChatMessage(message.getChatForumIdCode(), message);

        return message1;
    }

//    @PostMapping("/addServiceProviderMessage/{roomId}")
//    public ResponseEntity<String> addMessageFromServiceProviderToChatRoom(@RequestBody MessageDto messageDto){
//        System.out.println("thisss"+Integer.valueOf(messageDto.getChatForumId()));
//        System.out.println("message"+messageDto.getMessageText());
//       // System.out.println("messageSendername"+messageDto.getMessageText());
//        System.out.println("messageSender id"+messageDto.getSenderId());
//
//        ChatForum chatForum = chatForumService.findById(messageDto.getChatForumId());
//        //System.out.println("add message room details "+chatForum.getId()+chatForum.getChatRoomName());
//        ServiceProvider serviceProvider = serviceProviderService.getServiceProviderDetailsById(messageDto.getSenderId());
//
//        ChatMessage message = new ChatMessage();
//
//            try {
//            message.setChatForum(chatForum);
//                System.out.println("Hereeee");
//
//                message.setMessageText(messageDto.getMessageText());
//            // message.setMessageSenderName();
//            message.setSentAt(LocalDateTime.now());
//            message.setMessageSenderName(serviceProvider.getUsername());
//            message.setFromTourist(false);
//            message.setReply(messageDto.isReply());
//            message.setReplyMessageId(messageDto.getReplyMessageId());
//                System.out.println("message is reply"+message.isReply());
//                System.out.println("message reply id+"+message.getReplyMessageId());
//           // chatForum.getMessageList().add(message);
//                chatForumService.saveChatMessage(messageDto.getChatForumId(), message);
////                System.out.println("the list"+chatForum.getMessageList());
////                for (ChatMessage chatMessage : chatForum.getMessageList()) {
////                    System.out.println("Message ID: " + chatMessage.getMessageId());
////                    System.out.println("Message Text: " + chatMessage.getMessageText());
////                    System.out.println("Sender Name: " + chatMessage.getMessageSenderName());
////                    System.out.println("Chat Forum ID: " + chatMessage.getChatForum().getId());
////                    System.out.println("Sender ID: " + chatMessage.getMessageSenderId());
////
////                    System.out.println("-----");
////                }
//                return ResponseEntity.ok("Added successfully");
//            }
//            catch (Exception e)
//            {
//                return ResponseEntity.status(500).body("Error adding service provider chat to forum");
//        }
//    }

    @PostMapping("/getServiceProviderMessages")
    public ResponseEntity<List<ChatMessage>> getServiceProviderChatMessages(@RequestBody IdDTO idDTO ){
        try {
            ChatForum chatForum = chatForumService.findById(Integer.valueOf(idDTO.getId()));
            System.out.println("all messages chatforum id-"+chatForum.getId());
            System.out.println("all messages "+chatForum.getMessageList());
            return ResponseEntity.ok(chatForum.getMessageList());

        }
        catch(Exception e){
            System.out.println("hereee getAllMessages error"+e );

            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/delete/{roomId}/{messageId}")
    public ResponseEntity<String> deleteMessage(
            @PathVariable("roomId") int roomId,
            @PathVariable("messageId") int messageId) {

        try {
            chatForumService.deleteChatMessage(roomId, messageId);
            return ResponseEntity.ok("Message deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting message: " + e.getMessage());
        }
    }

    public static class MessageDto{
        private String messageText;
        private String messageSenderName;
        private int senderId;
        private int chatForumId;
        private boolean isReply;
        private int replyMessageId;
        private List<Integer> replyMessageList;
        private LocalDateTime sentAt;
        private boolean fromTourist;

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

        public int getSenderId() {
            return senderId;
        }

        public void setSenderId(int senderId) {
            this.senderId = senderId;
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

        public int getChatForumId() {
            return chatForumId;
        }

        public void setChatForumId(int chatForumId) {
            this.chatForumId = chatForumId;
        }
    }


    public static class IdDTO {
        private String id;

        // Getter and Setter
        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }
    }






}
