package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.services.AttachmentService
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/attachments")
class AttachmentController(private val attachmentService: AttachmentService) {
}
