import React, { useState, useEffect } from 'react';
import {
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {useUserId} from './UserIdContext';
import { set } from 'rsuite/esm/internals/utils/date';
import './servprochatforum.css';
// import { ToastContainer, toast } from 'react-toastify';
import { useFirebaseUpload } from './ImageUpload';
import { Button } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
export default function ServiceProviderChatForum  ({serviceType,username}) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const {id} = useUserId();
  const [replyToMessageId, setReplyToMessageId] = useState(null);
  const [roomId, setRoomId] = useState(null);
  
  const { uploadImage } = useFirebaseUpload();
  const [imageUrls, setImageUrls] = useState([]);
  const [imageUrl, setImageUrl] = useState();

  const serviceTypeToRoomIdMap = {
    'Transport': 1,
    'Event': 2,
    'Hotel': 3,
    'Course': 4,
    'TravelLocation': 5,
    'Package': 6,
  };

  useEffect(() => {
    if (serviceType) {
      const roomId = serviceTypeToRoomIdMap[serviceType];
      setRoomId(roomId);
      console.log('Room ID:', roomId);
    }
  }, [serviceType]);

  useEffect(() => {
   if(id&& !isConnected &&roomId){
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);

 // if(!client){
      //  if(!isConnected){

    client.connect({}, () => {

       

      client.subscribe(`/topic/messages/${roomId}`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        console.log("thisss Received message:",receivedMessage);
        console.log("thisss all messages:",messages);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        console.log("After addition thisss all messages:",messages);

        //toast.info(`New message from ${receivedMessage.messageSenderName}: ${receivedMessage.messageText}`);

      });
      setIsConnected(true); // Connection established
    console.log('Subscribing to /topic/messages/',roomId);
    });
    
   // }
    

    setStompClient(client);
 // }
    }
    return () => {
    //   client.disconnect();
    console.log('Disconnecting WebSocket');

    if (stompClient) {
        stompClient.disconnect(() => setIsConnected(false)); // Clean up on component unmount
   // client.disconnect();
      }

    // if(client){
    //     client.disconnect();
    //     setIsConnected(false);
    // }


    };
  }, [id,roomId,]);

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };


  // useEffect(() => {
  //   console.log("Updated messages:", messages);
  // }, [messages]);
  // useEffect(() => {
  //   console.log("thisss Updated message:", message);
  // }, [message]);

  useEffect(() => {
    console.log('Component mounted');
    return () => {
      console.log('Component unmounted');
    };
  }, [])

  const getServiceProviderChatRoomMessages = async()=>{
    try{
      const response = await fetch('http://localhost:8080/chatMessage/getServiceProviderMessages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify({ id: "1" }),
        body: JSON.stringify({id:roomId}),
      });
      const data = await response.json();
      // console.log("all message data:",data);
      console.log("all message response:",data);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //if(data!=null){
        setMessages(data);  

      //}
    }
    catch(error){
      console.log("Error fetching chat room messages",error );
    }
  }

  useEffect(()=>{
    if(roomId){
      getServiceProviderChatRoomMessages();
    }
  },[roomId])

  const sendTextMessage = () => {
    if (message.trim()) {
      const chatMessage = {
        // nickname,
        // content: message,
        messageText:message,
        messageSenderName:username,
        reply: !!replyToMessageId,
        replyMessageId: replyToMessageId || null,
        chatForumIdCode:roomId,
        senderId:id,
        isImage: false,
        image:false,

      };
      console.log("Chat message to send",chatMessage);

      stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage));
      //saveServiceProviderChatRoomMessage();
      setMessage('');
     setReplyToMessageId(null); // Reset reply state after sending

    }
  };

//   const saveServiceProviderChatRoomMessage = async()=>{
//     if (message.trim()) {
//       const chatMessage = {
//         // nickname,
//         // content: message,
//         messageText:message,
//         messageSenderName:nickname,
//         chatForumId:1,
//         senderId:id,
//         reply: !!replyToMessageId,
//         replyMessageId: replyToMessageId || 0,
//       };
//       console.log("Chat message to save",chatMessage);
//     try{
//      const response = await fetch('http://localhost:8080/chatMessage/addServiceProviderMessage',{
//       method:'POST',
//       headers:{'Content-Type':'application/json'},
//       body: JSON.stringify(chatMessage)
//      });

//      if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     // const data = await response.json();
// console.log("Message saved",response);  
// // console.log("Message saved",data);
//      setMessage('');
//      setReplyToMessageId(null); // Reset reply state after sending

//     }catch(error){
//       console.log("Error saving chat room message",error);
//     }
//   }
//   }
  
  const handleReply = (messageId) => {
    setReplyToMessageId(messageId);
  };

  const addImageUrl = (newUrl) => {
    // setImageUrls((prevImageUrls) => [...prevImageUrls, newUrl]);
     
    setImageUrls((prevImageUrls) => [...prevImageUrls, newUrl]);
  }
  
  const handleFireBaseUpload = (e) => {
    document.getElementById('ImageLoading').style.display = 'block';
    const file = e.target.files[0];
    if (file) {
        uploadImage(file).then(url => {
            
            const uploadedUrl = url;
            setImageUrl(url);
            sendImageMessage(url);
            // document.getElementById('ServiceImageView').src = uploadedUrl; 
            // document.getElementById('servImage').value= uploadedUrl;
            //addImageUrl(uploadedUrl);
            console.log("Uploaded URL for message:", url);
            document.getElementById('ImageLoading').style.display = 'none';
        }).catch(err => {
            console.error("Upload failed:", err);
            document.getElementById('ImageLoading').style.display = 'none';
        });
    }
  };

  const sendImageMessage = (url) => {
      const chatMessage = {
        // nickname,
        // content: message,
        messageText:url,
        messageSenderName:username,
        reply: !!replyToMessageId,
        replyMessageId: replyToMessageId || null,
        chatForumIdCode:roomId,
        senderId:id,
        isImage: true,
        image:true,

      };
      console.log("Image message to send",chatMessage);

      stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage));
      //saveServiceProviderChatRoomMessage();
      setMessage('');
     setReplyToMessageId(null); // Reset reply state after sending
     setImageUrl('');

  };
  return (
    <div>
              <h2 style={{ margin:'15px auto' }}>Chat Forum</h2>

  <div className="chat-container">
  <ul className="chat-room">
    {messages.map((msg, index) => (
      <li key={index} className="chat-message">
       
        {msg.reply && (
          <div className="reply-info">
            {messages.find(
              originalMessage => originalMessage.messageId === msg.replyMessageId
            ) && (
              <>
                <div className="reply-sender">
                  Replying to:{" "}
                  {messages.find(
                    originalMessage => originalMessage.messageId === msg.replyMessageId
                  )?.messageSenderName}
                </div>
                {/* <div className="reply-text">

                  {messages.find(
                    originalMessage => originalMessage.messageId === msg.replyMessageId
                  )?.messageText}
                </div> */}
                <div className="reply-text">
             {(() => {
             const originalMessage = messages.find(
              originalMessage => originalMessage.messageId === msg.replyMessageId
              );
            if (originalMessage?.image) {
              // If the original message is an image, display the image
              return (
              <img
               src={originalMessage.messageText}
                // alt="Replied Image"
                style={{ width: '50%' }}
                />
                );
              } else {
                // If it's not an image, display the text
                return originalMessage?.messageText;
                  }
                })()}
  </div>    
              </>
            )}
          </div>
        )}
        <div className="message-sender">{msg.messageSenderName}</div>
        {/* <div className="message-text">{msg.messageText}</div> */}
        {msg.image ? (
        <img
          src={msg.messageText} 
          style={{ width: '50%', height:'50%'}}

          // style={{ width: '20%',height:'10%', marginBottom: '5px', marginTop: '5px' }}
        />
        // <div className="message-text">{msg.messageText}</div>
      ) : (
        <div className="message-text">{msg.messageText}</div>
      )}
        <button className="reply-button" onClick={() => handleReply(msg.messageId)}>
          Reply
        </button>
      </li>
    ))}
  </ul>
  <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          placeholder="Enter your nickname"
          value={username}
          autoFocus
          InputProps={{
            readOnly: true,
            sx: { fontSize: '14px' }
          }}
          
        />
        <TextField
          placeholder="Type a message"
          value={message}
          onChange={handleMessageChange}
          fullWidth
          InputProps={{
            sx: { fontSize: '14px' } // Increase text size here
          }}
        />
          
        <IconButton onClick={sendTextMessage} disabled={!message.trim()}>
          Send
        </IconButton>
        <div>
      <input
        accept="image/*"
        id="contained-button-file"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFireBaseUpload}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<UploadIcon />}
          sx={{
            marginLeft: '5px',
            backgroundColor: '#b0b0b0', // Greyish color
            color: 'white',
            '&:hover': {
              backgroundColor: '#a0a0a0', // Darker grey on hover
            },
          }}
        >
          Upload Image
        </Button>
      </label>
    </div>
      </div>
</div>
{/* <ToastContainer /> */}
    </div>
  );
};

