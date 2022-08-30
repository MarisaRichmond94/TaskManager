package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.dtos.CreateNewTaskDTO
import com.marisarichmond.taskmanager.models.dtos.TaskDTO
import com.marisarichmond.taskmanager.models.dtos.TaskDataDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskByIdDTO
import com.marisarichmond.taskmanager.services.TaskManagerService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@CrossOrigin
@RestController
@RequestMapping("/api/private/task_manager")
class TaskManagerController(private val taskManagerService: TaskManagerService) {
    @ResponseBody
    @PostMapping("/tasks")
    fun create(
        @RequestHeader("userId") userId: UUID,
        @RequestBody createNewTaskDTO: CreateNewTaskDTO,
    ): ResponseEntity<TaskDTO?> =
        when (val newTask = taskManagerService.create(userId, createNewTaskDTO)) {
            is TaskDTO -> ResponseEntity.status(HttpStatus.CREATED).body(newTask)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }

    @ResponseBody
    @GetMapping
    fun getTaskDataByUserId(@RequestHeader("userId") userId: UUID): ResponseEntity<TaskDataDTO> =
        taskManagerService.getTaskDataByUserId(userId).let { ResponseEntity.status(HttpStatus.OK).body(it) }

    @ResponseBody
    @GetMapping("/tasks/{taskId}")
    fun getTaskById(@RequestHeader("userId") userId: UUID, @PathVariable taskId: UUID): ResponseEntity<TaskDTO> =
        when (val taskById = taskManagerService.getTaskById(userId, taskId)) {
            is TaskDTO -> ResponseEntity.status(HttpStatus.ACCEPTED).body(taskById)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }

    @ResponseBody
    @PatchMapping("/tasks/{taskId}")
    fun updateTaskById(
        @RequestHeader("userId") userId: UUID,
        @PathVariable taskId: UUID,
        @RequestBody updateTaskByIdDTO: UpdateTaskByIdDTO,
    ): ResponseEntity<TaskDTO?> =
        when (val updatedTask = taskManagerService.updateTaskById(userId, taskId, updateTaskByIdDTO)) {
            is TaskDTO -> ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedTask)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }

    @ResponseBody
    @DeleteMapping("/{taskId}")
    fun deleteTaskDataByTaskId(@PathVariable taskId: UUID, @RequestHeader("userId") userId: UUID): ResponseEntity<String> =
        if (taskManagerService.deleteTaskDataByTaskId(taskId, userId)) ResponseEntity.status(HttpStatus.ACCEPTED).body("Task successfully deleted.")
        else ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete Task with id \"$taskId\".")

    @ResponseBody
    @DeleteMapping("/tags/{tagId}")
    fun deleteTagById(@PathVariable tagId: UUID, @RequestHeader("userId") userId: UUID): ResponseEntity<String> =
        if (taskManagerService.deleteTagById(tagId, userId)) ResponseEntity.status(HttpStatus.ACCEPTED).body("Task successfully deleted.")
        else ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete Tag with id \"$tagId\".")
}
