package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.constants.ExceptionConstants.Companion.TASK_DATA
import com.marisarichmond.taskmanager.models.Tag
import com.marisarichmond.taskmanager.models.Task
import com.marisarichmond.taskmanager.models.dtos.CreateNewTaskDTO
import com.marisarichmond.taskmanager.models.dtos.TaskDTO
import com.marisarichmond.taskmanager.models.dtos.TaskDataDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskByIdDTO
import com.marisarichmond.taskmanager.services.TaskManagerService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@CrossOrigin(origins = ["*"])
@RestController
@RequestMapping("/api/private/task_manager")
class TaskManagerController(private val taskManagerService: TaskManagerService) : BaseController() {
    @ResponseBody
    @PostMapping("/tasks")
    fun create(
        @RequestHeader("userId") userId: UUID,
        @RequestBody createNewTaskDTO: CreateNewTaskDTO,
    ): ResponseEntity<TaskDTO> = try {
        ResponseEntity.status(HttpStatus.CREATED).body(taskManagerService.create(userId, createNewTaskDTO))
    } catch (exception: Exception) {
        throw baseControllerException(Action.CREATE, exception, Task::class.simpleName)
    }

    @ResponseBody
    @GetMapping
    fun getTaskDataByUserId(@RequestHeader("userId") userId: UUID): ResponseEntity<TaskDataDTO> = try {
        taskManagerService.getTaskDataByUserId(userId).let { ResponseEntity.status(HttpStatus.OK).body(it) }
    } catch (exception: Exception) {
        throw baseControllerException(Action.GET, exception, TASK_DATA)
    }

    @ResponseBody
    @GetMapping("/tasks/{taskId}")
    fun getTaskById(@RequestHeader("userId") userId: UUID, @PathVariable taskId: UUID): ResponseEntity<TaskDTO> = try {
        ResponseEntity.status(HttpStatus.ACCEPTED).body(taskManagerService.getTaskById(userId, taskId))
    } catch (exception: Exception) {
        throw baseControllerException(Action.GET, exception, Task::class.simpleName)
    }

    @ResponseBody
    @PatchMapping("/tasks/{taskId}")
    fun updateTaskById(
        @RequestHeader("userId") userId: UUID,
        @PathVariable taskId: UUID,
        @RequestBody updateTaskByIdDTO: UpdateTaskByIdDTO,
    ): ResponseEntity<TaskDTO> = try {
        ResponseEntity.status(HttpStatus.ACCEPTED).body(
            taskManagerService.updateTaskById(userId, taskId, updateTaskByIdDTO)
        )
    } catch (exception: Exception) {
        throw baseControllerException(Action.UPDATE, exception, Task::class.simpleName)
    }

    @ResponseBody
    @DeleteMapping("/{taskId}")
    fun deleteTaskDataByTaskId(@PathVariable taskId: UUID, @RequestHeader("userId") userId: UUID): ResponseEntity<String> = try {
        taskManagerService.deleteTaskDataByTaskId(taskId, userId)
        ResponseEntity.status(HttpStatus.ACCEPTED).body("Task successfully deleted.")
    } catch (exception: Exception) {
        throw baseControllerException(Action.DELETE, exception, TASK_DATA)
    }

    @ResponseBody
    @DeleteMapping("/tags/{tagId}")
    fun deleteTagById(@PathVariable tagId: UUID, @RequestHeader("userId") userId: UUID): ResponseEntity<String> = try {
        taskManagerService.deleteTagById(tagId, userId)
        ResponseEntity.status(HttpStatus.ACCEPTED).body("Task successfully deleted.")
    } catch (exception: Exception) {
        throw baseControllerException(Action.DELETE, exception, Tag::class.simpleName)
    }
}
