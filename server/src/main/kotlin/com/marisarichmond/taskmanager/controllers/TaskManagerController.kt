package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.Task
import com.marisarichmond.taskmanager.models.TaskAttachment
import com.marisarichmond.taskmanager.models.TaskTag
import com.marisarichmond.taskmanager.models.dtos.*
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
    @GetMapping
    fun getTaskDataByUserId(@RequestHeader("userId") userId: UUID): ResponseEntity<TaskDataDTO> = try {
        taskManagerService.getTaskDataByUserId(userId).let {
            ResponseEntity.status(HttpStatus.OK).body(it)
        }
    } catch (exception: Exception) {
        throw baseControllerException(Action.GET, exception, TaskDataDTO::class.simpleName)
    }

    @ResponseBody
    @PostMapping("/tasks")
    fun createTask(
        @RequestHeader("userId") userId: UUID,
        @RequestBody createTaskDTO: CreateTaskDTO,
    ): ResponseEntity<TaskDTO> = try {
        ResponseEntity
            .status(HttpStatus.CREATED)
            .body(taskManagerService.createTask(userId, createTaskDTO))
    } catch (exception: Exception) {
        throw baseControllerException(Action.CREATE, exception, Task::class.simpleName)
    }

    @ResponseBody
    @GetMapping("/tasks/{taskId}")
    fun getTaskById(
        @RequestHeader("userId") userId: UUID,
        @PathVariable taskId: UUID,
    ): ResponseEntity<TaskDTO> = try {
        ResponseEntity
            .status(HttpStatus.ACCEPTED)
            .body(taskManagerService.getTaskById(userId, taskId))
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
        ResponseEntity
            .status(HttpStatus.ACCEPTED)
            .body(taskManagerService.updateTaskById(userId, taskId, updateTaskByIdDTO))
    } catch (exception: Exception) {
        throw baseControllerException(Action.UPDATE, exception, Task::class.simpleName)
    }

    @ResponseBody
    @DeleteMapping("tasks/{taskId}")
    fun deleteTaskDataByTaskId(
        @PathVariable taskId: UUID,
        @RequestHeader("userId") userId: UUID,
    ): ResponseEntity<String> = try {
        taskManagerService.deleteTaskDataByTaskId(taskId, userId)
        ResponseEntity.status(HttpStatus.ACCEPTED).body("${Task::class.simpleName} successfully deleted.")
    } catch (exception: Exception) {
        throw baseControllerException(Action.DELETE, exception, TaskDataDTO::class.simpleName)
    }

    @ResponseBody
    @PostMapping("/task/attachments")
    fun createTaskAttachment(
        @RequestBody createTaskAttachmentDTO: CreateTaskAttachmentDTO,
    ): ResponseEntity<AttachmentDTO> = try {
        ResponseEntity
            .status(HttpStatus.CREATED)
            .body(taskManagerService.createTaskAttachment(createTaskAttachmentDTO))
    } catch (exception: Exception) {
        throw baseControllerException(Action.CREATE, exception, TaskAttachment::class.simpleName)
    }

    @ResponseBody
    @PatchMapping("/task/attachments/{attachmentId}")
    fun updateTaskAttachmentById(
        @PathVariable attachmentId: UUID,
        @RequestBody updateAttachmentDTO: UpdateAttachmentDTO,
    ): ResponseEntity<AttachmentDTO> = try {
        ResponseEntity
            .status(HttpStatus.ACCEPTED)
            .body(taskManagerService.updateTaskAttachmentById(attachmentId, updateAttachmentDTO))
    } catch (exception: Exception) {
        throw baseControllerException(Action.UPDATE, exception, TaskAttachment::class.simpleName)
    }

    @ResponseBody
    @DeleteMapping("/task/attachments/{attachmentId}")
    fun deleteTaskAttachmentById(
        @PathVariable attachmentId: UUID,
        @RequestHeader("userId") userId: UUID,
    ): ResponseEntity<String> = try {
        taskManagerService.deleteTaskAttachmentById(attachmentId, userId)
        ResponseEntity
            .status(HttpStatus.ACCEPTED)
            .body("${TaskAttachment::class.simpleName} successfully deleted")
    } catch (exception: Exception) {
        throw baseControllerException(Action.DELETE, exception, TaskAttachment::class.simpleName)
    }

    @ResponseBody
    @PostMapping("/task/tags")
    fun createTaskTag(
        @RequestBody createTaskTagDTO: CreateTaskTagDTO,
    ): ResponseEntity<TaskTagDTO> = try {
        ResponseEntity
            .status(HttpStatus.CREATED)
            .body(taskManagerService.createTaskTag(createTaskTagDTO))
    } catch (exception: Exception) {
        throw baseControllerException(Action.CREATE, exception, TaskTag::class.simpleName)
    }

    @ResponseBody
    @DeleteMapping("/task/tags/{taskTagId}")
    fun deleteTaskTagById(
        @PathVariable taskTagId: UUID,
        @RequestHeader("userId") userId: UUID,
    ): ResponseEntity<String> = try {
        taskManagerService.deleteTaskTagById(taskTagId, userId)
        ResponseEntity
            .status(HttpStatus.ACCEPTED)
            .body("${TaskTag::class.simpleName} successfully deleted")
    } catch (exception: Exception) {
        throw baseControllerException(Action.DELETE, exception, TaskTag::class.simpleName)
    }
}
