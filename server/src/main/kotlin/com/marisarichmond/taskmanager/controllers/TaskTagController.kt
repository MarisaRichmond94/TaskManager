package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.TaskTag
import com.marisarichmond.taskmanager.models.dtos.CreateTaskTagDTO
import com.marisarichmond.taskmanager.models.dtos.TaskTagDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskTagDTO
import com.marisarichmond.taskmanager.services.TaskTagService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@CrossOrigin(origins = ["*"])
@RestController
@RequestMapping("/api/private/task_tags")
class TaskTagController(private val taskTagService: TaskTagService) : BaseController(TaskTag::class.simpleName) {
    @ResponseBody
    @PostMapping
    fun create(@RequestBody createTaskTagDTO: CreateTaskTagDTO): ResponseEntity<TaskTagDTO> = try {
        ResponseEntity.status(HttpStatus.CREATED).body(taskTagService.create(createTaskTagDTO))
    } catch (exception: Exception) {
        throw baseControllerException(Action.CREATE, exception)
    }

    @ResponseBody
    @PatchMapping("/{id}")
    fun updateById(
        @PathVariable id: UUID,
        @RequestBody updateTaskTagDTO: UpdateTaskTagDTO,
    ): ResponseEntity<TaskTagDTO> = try {
        ResponseEntity.status(HttpStatus.ACCEPTED).body(taskTagService.updateById(id, updateTaskTagDTO))
    } catch (exception: Exception) {
        throw baseControllerException(Action.UPDATE, exception)
    }

    @ResponseBody
    @DeleteMapping("/{id}")
    fun deleteById(@PathVariable id: UUID): ResponseEntity<String> = try {
        taskTagService.deleteById(id)
        ResponseEntity.status(HttpStatus.ACCEPTED).body("TaskTag successfully deleted.")
    } catch (exception: Exception) {
        throw baseControllerException(Action.DELETE, exception)
    }
}
