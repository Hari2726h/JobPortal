import React, { useState, useEffect, useRef } from 'react';
import { sendMessage, fetchMessages } from '../utils/api';

const ChatBox = ({ currentUserId, otherUserId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const data = await fetchMessages(currentUserId, otherUserId);
                setMessages(data);
            } catch (err) {
                console.error('Failed to fetch messages:', err);
            }
        };

        loadMessages();
        const interval = setInterval(loadMessages, 2000);
        return () => clearInterval(interval);
    }, [currentUserId, otherUserId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!newMessage.trim()) return;

        const tempMessage = {
            id: Date.now(),
            senderId: currentUserId,
            receiverId: otherUserId,
            messageText: newMessage
        };

        setMessages((prev) => [...prev, tempMessage]);
        setNewMessage('');

        try {
            await sendMessage(tempMessage);
        } catch (err) {
            console.error('Failed to send message:', err);
        }
    };

    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '12px',
            height: '500px',
            width: '100%',
            maxWidth: '600px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            backgroundColor: '#f9f9f9'
        }}>
            <div style={{
                flex: 1,
                padding: '15px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        style={{
                            alignSelf: msg.senderId === currentUserId ? 'flex-end' : 'flex-start',
                            maxWidth: '80%',
                            display: 'flex'
                        }}
                    >
                        <span style={{
                            padding: '10px 16px',
                            borderRadius: '20px',
                            backgroundColor: msg.senderId === currentUserId ? '#007bff' : '#e5e5ea',
                            color: msg.senderId === currentUserId ? '#fff' : '#000',
                            wordBreak: 'break-word',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                        }}>
                            {msg.messageText}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div style={{
                display: 'flex',
                padding: '10px',
                borderTop: '1px solid #ddd',
                backgroundColor: '#fff'
            }}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                    placeholder="Type a message..."
                    style={{
                        flex: 1,
                        padding: '10px 15px',
                        borderRadius: '20px',
                        border: '1px solid #ccc',
                        outline: 'none',
                        marginRight: '10px',
                        fontSize: '14px'
                    }}
                />
                <button
                    onClick={handleSend}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '20px',
                        border: 'none',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = '#007bff'}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;