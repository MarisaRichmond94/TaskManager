package com.marisarichmond.taskmanager.controllers

import com.fasterxml.jackson.annotation.JsonProperty
import com.marisarichmond.taskmanager.models.TaskList
import com.marisarichmond.taskmanager.services.TaskListService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

data class CreateTaskListRequestBody(
    val name: String,
    val description: String? = null,
    @JsonProperty("user_id") val userId: UUID,
)

data class UpdateTaskListRequestBody(
    val name: String,
    val description: String? = null,
)

@RestController
@RequestMapping("/task_lists")
class TaskListController(private val taskListService: TaskListService) {
    @ResponseBody
    @PostMapping
    fun createNewTaskList(@RequestBody createTaskListRequestBody: CreateTaskListRequestBody): ResponseEntity<TaskList?> {
        return when (val newTaskList = taskListService.createNewTaskList(createTaskListRequestBody)) {
            is TaskList -> ResponseEntity.status(HttpStatus.CREATED).body(newTaskList)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }
    }

    @ResponseBody
    @GetMapping("/{id}")
    fun getTaskListById(@PathVariable id: UUID): ResponseEntity<TaskList?> {
        return when (val taskListById = taskListService.getTaskListById(id)) {
            is TaskList -> ResponseEntity.status(HttpStatus.FOUND).body(taskListById)
            else -> ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
    }

    @ResponseBody
    @GetMapping
    fun getTaskListsByUserId(@RequestParam userId: UUID): ResponseEntity<List<TaskList>> {
        val taskListsByUserId = taskListService.getTaskListsByUserId(userId)
        return when {
            taskListsByUserId.isNotEmpty() -> ResponseEntity.status(HttpStatus.FOUND).body(taskListsByUserId)
            else -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(emptyList())
        }
    }

    @ResponseBody
    @PatchMapping("/{id}")
    fun updateTaskListById(@PathVariable id: UUID, @RequestBody updateTaskListRequestBody: UpdateTaskListRequestBody): ResponseEntity<TaskList?> {
        return when (val updatedTaskListById = taskListService.updateTaskListById(id, updateTaskListRequestBody)) {
            is TaskList -> ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedTaskListById)
            else -> ResponseEntity.status(HttpStatus.NOT_MODIFIED).build()
        }
    }

    @ResponseBody
    @DeleteMapping("/{id}")
    fun deleteTaskListById(@PathVariable id: UUID): ResponseEntity<Unit> {
        return when (taskListService.deleteTaskListById(id)) {
            true -> ResponseEntity.status(HttpStatus.ACCEPTED).build()
            else -> ResponseEntity.status(HttpStatus.NOT_MODIFIED).build()
        }
    }
}
