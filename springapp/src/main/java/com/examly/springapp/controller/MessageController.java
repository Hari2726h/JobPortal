package com.examly.springapp.controller;

import com.examly.springapp.model.Message;
import com.examly.springapp.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @PostMapping
    public Message sendMessage(@RequestBody Message message) {
        return messageRepository.save(message);
    }

    @GetMapping
    public List<Message> getMessages(@RequestParam Long user1, @RequestParam Long user2) {
        return messageRepository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderByTimestampAsc(
                user1, user2, user1, user2);
    }

    @GetMapping("/user/{userId}")
    public List<Message> getAllMessagesForUser(@PathVariable Long userId) {
        return messageRepository.findByReceiverIdOrderByTimestampAsc(userId);
    }
}
