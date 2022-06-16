package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.services.TagService
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/tags")
class TagController(private val tagService: TagService) {
}
