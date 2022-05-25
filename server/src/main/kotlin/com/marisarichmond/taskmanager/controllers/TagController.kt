package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.repositories.TagRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/tags")
class TagController(private val repository: TagRepository) {
}