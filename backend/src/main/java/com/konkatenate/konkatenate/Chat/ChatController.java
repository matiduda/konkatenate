package com.konkatenate.konkatenate.Chat;

import java.util.logging.Logger;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin
public class ChatController {

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor)
            throws Exception {
        var sessionAttributes = headerAccessor.getSessionAttributes();

        chatMessage.setTimestamp(headerAccessor.getTimestamp());

        if (sessionAttributes == null) {
            throw new Exception("Could not head session attributes");
        }

        sessionAttributes.put("username", chatMessage.getSender());
        return chatMessage;
    }
}
