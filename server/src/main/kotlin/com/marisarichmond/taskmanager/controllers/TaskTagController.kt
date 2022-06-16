package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.services.TaskTagService
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/task_tags")
class TaskTagController(private val taskTagService: TaskTagService) {
}
