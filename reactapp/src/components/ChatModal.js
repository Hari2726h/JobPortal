import React, { useEffect, useState, useRef } from 'react';
import { Modal, ListGroup, Form, Button, Image } from 'react-bootstrap';
import {
    fetchMessages,
    sendMessage,
    getApplicationsByCompany,
    getCompanyById,
    fetchAllMessagesForUser
} from '../utils/api';

const ChatModal = ({ show, handleClose, currentUser, currentType }) => {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const bottomRef = useRef(null);

    useEffect(() => {
        const loadContacts = async () => {
            try {
                if (currentType === 'company') {
                    const applications = await getApplicationsByCompany(currentUser.id);
                    const uniqueUsers = Array.from(
                        new Map(applications.map(app => [app.user.id, app.user])).values()
                    );
                    setContacts(uniqueUsers);
                } else {
                    const allMessages = await fetchAllMessagesForUser(currentUser.id);
                    const companyIds = [...new Set(allMessages.map(msg => msg.senderId))];
                    const companiesWithMessages = [];

                    for (const id of companyIds) {
                        try {
                            const company = await getCompanyById(id);
                            if (company) companiesWithMessages.push(company);
                        } catch (err) {
                            console.error(`Failed to fetch company ${id}`, err);
                        }
                    }

                    setContacts(companiesWithMessages);
                }
            } catch (error) {
                console.error('Error loading contacts:', error);
                setContacts([]);
            }
        };

        loadContacts();
    }, [currentUser, currentType]);

    useEffect(() => {
        if (selectedContact) {
            loadMessages(selectedContact.id);
        } else {
            setMessages([]);
        }
    }, [selectedContact]);

    const loadMessages = async (contactId) => {
        try {
            const msgs = await fetchMessages(contactId, currentUser.id);
            setMessages(msgs || []);
            scrollToBottom();
        } catch (error) {
            console.error('Error fetching messages:', error);
            setMessages([]);
        }
    };

    const handleSend = async () => {
        if (!newMessage.trim() || !selectedContact) return;

        const messageObj = {
            senderId: currentUser.id,
            receiverId: selectedContact.id,
            messageText: newMessage.trim(),
            timestamp: new Date().toISOString(),
        };

        try {
            await sendMessage(messageObj);
            setNewMessage('');
            await loadMessages(selectedContact.id);
            scrollToBottom();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const scrollToBottom = () => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title>💬 Messages</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: 'flex', height: '500px', borderRadius: '10px' }}>

                <ListGroup style={{ width: '30%', overflowY: 'auto', marginRight: '10px', borderRight: '1px solid #ddd' }}>
                    {contacts.length === 0 ? (
                        <ListGroup.Item>No contacts found</ListGroup.Item>
                    ) : (
                        contacts.map(contact => (
                            <ListGroup.Item
                                key={contact.id}
                                action
                                active={selectedContact?.id === contact.id}
                                onClick={() => setSelectedContact(contact)}
                                className="d-flex align-items-center"
                                style={{ cursor: 'pointer' }}
                            >
                                <Image
                                    src={`https://ui-avatars.com/api/?name=${contact.name || contact.companyName || 'U'}&background=0d6efd&color=fff`}
                                roundedCircle
                                width={35}
                                height={35}
                                className="me-2"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    />
                                <span>{contact.name || contact.companyName || 'Unknown'}</span>
                            </ListGroup.Item>
                        ))
                    )}
                </ListGroup>

                <div style={{ width: '70%', display: 'flex', flexDirection: 'column', background: '#f8f9fa', borderRadius: '10px' }}>

                    {selectedContact && (
                        <div style={{ padding: '10px', background: '#e9ecef', borderBottom: '1px solid #ddd', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                            <strong>Chatting with:</strong> {selectedContact.name || selectedContact.companyName}
                        </div>
                    )}

                    <div style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
                        {messages.map(msg => (
                            <div key={msg.id} style={{ margin: '8px 0', textAlign: msg.senderId === currentUser.id ? 'right' : 'left' }}>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        background: msg.senderId === currentUser.id ? 'linear-gradient(135deg,#0d6efd,#1e90ff)' : '#e9ecef',
                                        color: msg.senderId === currentUser.id ? 'white' : 'black',
                                        padding: '8px 14px',
                                        borderRadius: '20px',
                                        maxWidth: '75%',
                                        wordBreak: 'break-word',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    {msg.messageText}
                                </div>
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    <Form className="d-flex p-3 border-top bg-white">
                        <Form.Control
                            type="text"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            className="me-2"
                        />
                        <Button variant="primary" onClick={handleSend}>
                            ➤
                        </Button>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ChatModal;