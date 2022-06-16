package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.services.TaskService
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/tasks")
class TaskController(private val taskService: TaskService) {
}