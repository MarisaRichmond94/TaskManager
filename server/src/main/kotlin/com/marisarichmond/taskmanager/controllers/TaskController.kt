package com.marisarichmond.taskmanager.controllers

import com.fasterxml.jackson.annotation.JsonProperty
import com.marisarichmond.taskmanager.models.Task
import com.marisarichmond.taskmanager.services.TaskService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.Instant
import java.util.*

data class CreateTaskRequestBody(
    val objective: String,
    @JsonProperty("user_id") val userId: UUID,
    val description: String? = null,
    @JsonProperty("due_date") val dueDate: Long = Instant.now().toEpochMilli(),
    @JsonProperty("is_pinned") val isPinned: Boolean? = null,
    @JsonProperty("tag_ids") val tagIds: Set<UUID>? = setOf(),
)

data class UpdateTaskRequestBody(
    val objective: String,
    val description: String? = null,
    @JsonProperty("due_date") val dueDate: Long = Instant.now().toEpochMilli(),
    @JsonProperty("is_pinned") val isPinned: Boolean? = null,
    @JsonProperty("tag_ids") val tagIds: Set<UUID>? = setOf(),
)

@RestController
@RequestMapping("/tasks")
class TaskController(private val taskService: TaskService) {
    @ResponseBody
    @PostMapping
    fun createNewTask(@RequestBody createTaskRequestBody: CreateTaskRequestBody): ResponseEntity<Task?> {
        return when (val newTask = taskService.createNewTask(createTaskRequestBody)) {
            is Task -> ResponseEntity.status(HttpStatus.CREATED).body(newTask)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }
    }

    @ResponseBody
    @GetMapping("/{id}")
    fun getTaskById(@PathVariable id: UUID): ResponseEntity<Task?> {
        return when (val taskById = taskService.getTaskById(id)) {
            is Task -> ResponseEntity.status(HttpStatus.FOUND).body(taskById)
            else -> ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
    }

    @ResponseBody
    @GetMapping
    fun getTasksByUserId(@RequestParam userId: UUID): ResponseEntity<List<Task>> {
        val tasksByUserId = taskService.getTasksByUserId(userId)
        return when {
            tasksByUserId.isNotEmpty() -> ResponseEntity.status(HttpStatus.FOUND).body(tasksByUserId)
            else -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(emptyList())
        }
    }

    @ResponseBody
    @PatchMapping("/{id}")
    fun updateTaskById(@PathVariable id: UUID, @RequestBody updateTaskRequestBody: UpdateTaskRequestBody): ResponseEntity<Task?> {
        return when (val updatedTaskById = taskService.updateTaskById(id, updateTaskRequestBody)) {
            is Task -> ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedTaskById)
            else -> ResponseEntity.status(HttpStatus.NOT_MODIFIED).build()
        }
    }

    @ResponseBody
    @DeleteMapping("/{id}")
    fun deleteTaskById(@PathVariable id: UUID): ResponseEntity<Unit> {
        return when (taskService.deleteTaskById(id)) {
            true -> ResponseEntity.status(HttpStatus.ACCEPTED).build()
            else -> ResponseEntity.status(HttpStatus.NOT_MODIFIED).build()
        }
    }
}