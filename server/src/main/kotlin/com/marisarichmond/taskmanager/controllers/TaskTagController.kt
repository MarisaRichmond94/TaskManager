package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.dtos.CreateTaskTagDTO
import com.marisarichmond.taskmanager.models.dtos.TaskTagDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskTagDTO
import com.marisarichmond.taskmanager.services.TaskTagService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@CrossOrigin
@RestController
@RequestMapping("/api/private/task_tags")
class TaskTagController(private val taskTagService: TaskTagService) {
    @ResponseBody
    @PostMapping
    fun create(@RequestBody createTaskTagDTO: CreateTaskTagDTO): ResponseEntity<TaskTagDTO?> =
        when (val taskTag = taskTagService.create(createTaskTagDTO)) {
            is TaskTagDTO -> ResponseEntity.status(HttpStatus.CREATED).body(taskTag)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }

    @ResponseBody
    @PatchMapping("/{id}")
    fun updateById(
        @PathVariable id: UUID,
        @RequestBody updateTaskTagDTO: UpdateTaskTagDTO,
    ): ResponseEntity<TaskTagDTO?> =
        when (val updatedTaskTag = taskTagService.updateById(id, updateTaskTagDTO)) {
            is TaskTagDTO -> ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedTaskTag)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }

    @ResponseBody
    @DeleteMapping("/{id}")
    fun deleteById(@PathVariable id: UUID): ResponseEntity<String> =
        if (taskTagService.deleteById(id)) ResponseEntity.status(HttpStatus.ACCEPTED).body("TaskTag successfully deleted.")
        else ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete TaskTag with id \"$id\".")
}
