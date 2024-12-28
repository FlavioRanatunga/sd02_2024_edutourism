import React, { useState, useEffect } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import './assets/css/commentsAndDiscussions.css';
import { Box, Card, CardContent, Typography, Avatar, Button, TextField, CircularProgress, Snackbar, Tabs, Tab } from '@mui/material';
import { red, grey, blue, lightBlue } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';

export default function CommentsAndDiscussions() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [replyUserName, setReplyUserName] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [loadingComments, setLoadingComments] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [tabIndex, setTabIndex] = useState(0);
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userName, setUserName] = useState('');

  // Fetch user information
  const fetchUserInfo = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/userinfo');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const user = await response.json();
      return user.username || 'Anonymous';
    } catch (error) {
      console.error('Error fetching user information:', error);
      return 'Anonymous';
    }
  };

  // Set author name on component mount
  useEffect(() => {
    const getUserInfo = async () => {
      const username = await fetchUserInfo();
      setCommentAuthor(username);
    };
    getUserInfo();
  }, []);

  // WebSocket connection
  useEffect(() => {
    if (!selectedTopic) return;

    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);

    client.connect({}, (frame) => {
      console.log('WebSocket Connected: ' + frame);
      setIsConnected(true);

      const subscription = client.subscribe(`/topic/messages/${selectedTopic}`, (message) => {
        console.log('Received message:', message.body);
        const newMessage = JSON.parse(message.body);
        setComments((prevComments) => [...prevComments, newMessage]);
      });

      setStompClient(client);

      return () => {
        subscription.unsubscribe();
        client.disconnect(() => {
          console.log('WebSocket Disconnected');
          setIsConnected(false);
        });
      };
    }, (error) => {
      console.error('WebSocket connection error:', error);
    });

    // Clean up WebSocket connection on component unmount
    return () => {
      if (client) {
        client.disconnect(() => {
          console.log('WebSocket Disconnected');
          setIsConnected(false);
        });
      }
    };
  }, [selectedTopic]);

  useEffect(() => {
    fetchTopics();
  }, []);

  useEffect(() => {
    if (selectedTopic !== null) {
      fetchComments(selectedTopic);
    }
  }, [selectedTopic]);

  const fetchTopics = async () => {
    setLoadingTopics(true);
    try {
      const response = await fetch('http://localhost:8080/api/topics');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setTopics(data);
      if (data.length > 0) {
        setSelectedTopic(data[0].id);
        setTabIndex(0);
      }
    } catch (error) {
      setError('Error fetching topics.');
      console.error('Error fetching topics:', error);
    } finally {
      setLoadingTopics(false);
    }
  };

  const fetchComments = async (topicId) => {
    setLoadingComments(true);
    try {
      const response = await fetch('http://localhost:8080/chatMessage/getServiceProviderMessages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: topicId })
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      setError('Error fetching comments.');
      console.error('Error fetching comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleTabChange = (event, newIndex) => {
    const selectedTopic = topics[newIndex];
    setSelectedTopic(selectedTopic.id);
    setTabIndex(newIndex);
  };

  const handlePostComment = () => {
    if (!newComment.trim()) {
      setSnackbarMessage('Comment content cannot be empty.');
      return;
    }

    const commentPayload = {
      messageText: newComment,
      messageSenderName: userName.trim() || "Anonymous",
      chatForumIdCode: selectedTopic,
      sentAt: new Date().toISOString()
    };

    if (stompClient && isConnected) {
      stompClient.send(`/app/chat/${selectedTopic}`, {}, JSON.stringify(commentPayload));
      console.log('Sent comment:', commentPayload);
      setNewComment('');
      setUserName('');
      setSnackbarMessage('Comment posted successfully!');
    } else {
      setSnackbarMessage('WebSocket not connected.');
    }
  };

  const handlePostReply = (parentCommentId) => {
    if (!replyContent.trim() || !replyUserName.trim()) {
      setSnackbarMessage('Reply content and username cannot be empty.');
      return;
    }

    const replyPayload = {
      messageText: replyContent,
      messageSenderName: replyUserName.trim(),
      chatForumIdCode: selectedTopic,
      replyMessageId: parentCommentId,
      sentAt: new Date().toISOString()
    };

    if (stompClient && isConnected) {
      console.log('Sending reply:', replyPayload);
      stompClient.send(`/app/chat/${selectedTopic}`, {}, JSON.stringify(replyPayload));
      setReplyContent('');
      setReplyUserName('');
      setReplyingTo(null);
      setSnackbarMessage('Reply posted successfully!');
    } else {
      setSnackbarMessage('WebSocket not connected.');
    }
  };

  const handleReplyClick = (commentId) => {
    setReplyingTo(commentId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const renderReplies = (parentId) => {
    return comments
      .filter(comment => comment.replyMessageId === parentId)
      .map(reply => (
        <Card key={reply.messageId} sx={{ marginBottom: 1, marginLeft: 3, bgcolor: grey[200], boxShadow: 1 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
              <Avatar sx={{ bgcolor: red[500], marginRight: 2 }}>
                {(reply.messageSenderName || 'Anonymous').charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '1.1rem' }}>
                {reply.messageSenderName || 'Anonymous'}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 2, fontSize: '0.8rem' }}>
                {formatDate(reply.sentAt)}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ fontSize: '1rem' }}>
              {reply.messageText}
            </Typography>
          </CardContent>
        </Card>
      ));
  };

  return (

    <section id ='blog' className="container">
       <div className="section-header" id='blog' style={{marginTop:'30px'}}>
         <h2>Blog</h2>
         <p>Share your adventures, gain insights from others, and plan your next educational journey.</p>
         </div>
       
    <div style={{width:'99%',margin:'50px auto'}}>
   
    
          {loadingTopics && (
            <CircularProgress sx={{ display: 'block', margin: '0 auto' }} />
          )}
          {error && <Typography color="error">{error}</Typography>}
          {!loadingTopics && (
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              aria-label="topics tabs"
              sx={{ marginBottom: 2, bgcolor: grey[200], borderRadius: 1 }}
            >
              {topics.map((topic) => (
                <Tab
                  key={topic.id}
                  label={topic.chatRoomName}
                  sx={{ textTransform: 'none', fontWeight: 'bold', fontSize:'1.5rem' }}
                />
              ))}
            </Tabs>
          )}
    
    </div>
    <Box
      sx={{
        padding: 3,
        bgcolor: grey[100],
        boxShadow: 3,
        borderRadius: 2,
        maxWidth: 800,
       
        margin: '0 auto',
        maxHeight: '1200px',
        overflowY: 'scroll',
      }}
    >
   
      {!loadingComments && selectedTopic !== null && (
        <Box>
          {comments.filter(comment => !comment.replyMessageId).map(comment => (
            <Card key={comment.messageId} sx={{ marginBottom: 2, boxShadow: 1, bgcolor: grey[100] }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                  <Avatar sx={{ bgcolor: red[500], marginRight: 2 }}>
                    {(comment.messageSenderName || 'Anonymous').charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '1.1rem' }}>
                    {comment.messageSenderName || 'Anonymous'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 2, fontSize: '0.8rem' }}>
                    {formatDate(comment.sentAt)}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                  {comment.messageText}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<ReplyIcon />}
                  onClick={() => handleReplyClick(comment.messageId)}
                  sx={{ marginTop: 1 }}
                >
                  Reply
                </Button>
                {replyingTo === comment.messageId && (
                  <Box sx={{ marginTop: 2 }}>
                    <TextField
                      label="Reply Content"
                      variant="outlined"
                      fullWidth
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      sx={{ marginBottom: 1 }}
                    />
                    <TextField
                      label="Your Name"
                      variant="outlined"
                      fullWidth
                      value={replyUserName}
                      onChange={(e) => setReplyUserName(e.target.value)}
                      sx={{ marginBottom: 1 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SendIcon />}
                      onClick={() => handlePostReply(comment.messageId)}
                    >
                      Send Reply
                    </Button>
                  </Box>
                )}
                {renderReplies(comment.messageId)}
              </CardContent>
            </Card>
          ))}
          {loadingComments && <CircularProgress sx={{ display: 'block', margin: '0 auto' }} />}
        </Box>
      )}

      {!loadingComments && selectedTopic !== null && (
        <Box sx={{ marginTop: 3 }}>
          <TextField
            label="New Message"
            variant="outlined"
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ marginBottom: 1 }}
          />
          <TextField
            label="Your Name"
            variant="outlined"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            sx={{ marginBottom: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SendIcon />}
            onClick={handlePostComment}
          >
            Send
          </Button>
        </Box>
      )}

      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={6000}
        onClose={() => setSnackbarMessage('')}
        message={snackbarMessage}
      />
    </Box>
    </section>
  );
}
