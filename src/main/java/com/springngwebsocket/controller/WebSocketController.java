package com.springngwebsocket.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

  @MessageMapping("/send/message")
  @SendTo("/start/initial")
  public String sendMessage(String message) {
    System.out.println(message);
    return message;
  }
}
