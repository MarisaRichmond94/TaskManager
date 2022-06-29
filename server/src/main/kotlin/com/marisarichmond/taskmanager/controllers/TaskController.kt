package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.Task
import com.marisarichmond.taskmanager.services.TaskService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

data class CreateNewTaskRequestBody(val id: UUID = UUID.randomUUID(), val objective: String)

@CrossOrigin
@RestController
@RequestMapping("/tasks")
class TaskController(private val taskService: TaskService) {
    @ResponseBody
    @PostMapping
    fun createNewTask(
        @RequestHeader("userId") userId: UUID,
        @RequestBody createNewTaskRequestBody: CreateNewTaskRequestBody,
    ): ResponseEntity<Task?> =
        when (val newTask = taskService.createNewTask(userId, createNewTaskRequestBody)) {
            is Task -> ResponseEntity.status(HttpStatus.CREATED).body(newTask)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }
}
