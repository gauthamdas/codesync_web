package com.example.colabed.api.controller;

import com.example.colabed.api.model.Editor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class ColabController {
    @MessageMapping("/edit")
    @SendTo("/text-editor/editor")
    private Editor receivechanges(@Payload Editor editor)
    {
        return new Editor("Hello"+ HtmlUtils.htmlEscape(editor.getSender()),"myname","body" );
    }
}
