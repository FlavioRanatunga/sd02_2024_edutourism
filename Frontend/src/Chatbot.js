import React, { useState } from 'react';
import './chatbot.css'; // Import the CSS file
import ContactSupportRoundedIcon from '@mui/icons-material/ContactSupportRounded';

const ChatbotIframe = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleChatbot = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      
      <button onClick={toggleChatbot} className="chatbot-toggle-button">
        <ContactSupportRoundedIcon style={{fontSize:"50px", right:'0'}}/>
      
      </button>
      <p className="chatbot-text">Need Assistance?</p>
      {isVisible && (
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/6Jsmp0Nq68JNgvL-uEkhj"
          style={{ position: 'fixed', width: '30%', height: '50%', bottom: '20px', right: '20px', zIndex: '1000000' }}
          frameBorder="0"
          title="Chatbot"
        ></iframe>
      )}
    </div>
  );
};

export default ChatbotIframe;
