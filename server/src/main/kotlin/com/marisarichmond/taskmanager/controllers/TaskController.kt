package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.repositories.TaskRepository
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/tasks")
class TaskController(private val repository: TaskRepository) {
}