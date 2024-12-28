// Notification.js
import React, { useEffect } from 'react';
import './notification.css'; // Import your CSS file for notification styles
import { motion } from 'framer-motion';

const Notification = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(); // Call the onClose function to handle any necessary actions
        }, 3000); // 3 seconds

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [onClose]);

    return (
        <motion.div
            className="notification"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 0.75, y: 0 }}
            exit={{ opacity: 0, y: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="notification-content">
                <span>{message}</span>
            </div>
        </motion.div>
    );
};

export default Notification;
