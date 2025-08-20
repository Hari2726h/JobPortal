import React, { useEffect, useState, useRef } from 'react';
import { Modal, ListGroup, Form, Button } from 'react-bootstrap';
import {
    fetchMessages,
    sendMessage,
    getApplicationsByCompany,
    fetchAppliedJobs,
    getCompanyById
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
                    // Company side: get all users who applied to this company's jobs
                    const applications = await getApplicationsByCompany(currentUser.id);
                    const uniqueUsers = Array.from(
                        new Map(applications.map(app => [app.user.id, app.user])).values()
                    );
                    setContacts(uniqueUsers);
                } else {
                    // User side: get all companies for jobs this user applied to
                    const appliedJobs = await fetchAppliedJobs(currentUser.id);
                    if (!appliedJobs || appliedJobs.length === 0) {
                        setContacts([]);
                        return;
                    }

                    const companyIds = appliedJobs
                        .map(job => job.companyId || job.company?.id)
                        .filter(Boolean);
                    const uniqueCompanyIds = [...new Set(companyIds)];

                    const companies = await Promise.all(
                        uniqueCompanyIds.map(async id => {
                            try {
                                return await getCompanyById(id);
                            } catch (err) {
                                console.error(`Failed to fetch company ${id}`, err);
                                return null;
                            }
                        })
                    );

                    setContacts(companies.filter(Boolean));
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
            const msgs = await fetchMessages(currentUser.id, contactId);
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
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chat</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: 'flex', height: '400px' }}>
                <ListGroup style={{ width: '30%', overflowY: 'auto', marginRight: '10px' }}>
                    {contacts.length === 0 ? (
                        <ListGroup.Item>No contacts found</ListGroup.Item>
                    ) : (
                        contacts.map(contact => (
                            <ListGroup.Item
                                key={contact.id}
                                action
                                active={selectedContact?.id === contact.id}
                                onClick={() => setSelectedContact(contact)}
                            >
                                {contact.name || contact.companyName || 'Unknown'}
                            </ListGroup.Item>
                        ))
                    )}
                </ListGroup>
                <div style={{ width: '70%', display: 'flex', flexDirection: 'column', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                        {messages.map(msg => (
                            <div key={msg.id} style={{ margin: '5px 0', textAlign: msg.senderId === currentUser.id ? 'right' : 'left' }}>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        background: msg.senderId === currentUser.id ? '#0d6efd' : '#e9ecef',
                                        color: msg.senderId === currentUser.id ? 'white' : 'black',
                                        padding: '5px 10px',
                                        borderRadius: '15px',
                                        maxWidth: '70%',
                                        wordBreak: 'break-word'
                                    }}
                                >
                                    {msg.messageText}
                                </div>
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>
                    <Form className="d-flex p-2">
                        <Form.Control
                            type="text"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <Button variant="primary" className="ms-2" onClick={handleSend}>
                            Send
                        </Button>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ChatModal;
