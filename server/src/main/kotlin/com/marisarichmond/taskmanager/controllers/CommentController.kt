package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.services.CommentService
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/comments")
class CommentController(private val commentService: CommentService) {
}
