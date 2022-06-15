package com.marisarichmond.taskmanager.controllers

import com.fasterxml.jackson.annotation.JsonProperty
import com.marisarichmond.taskmanager.models.TaskTag
import com.marisarichmond.taskmanager.services.TaskTagService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

data class CreateTaskTagsRequestBody(
    @JsonProperty("task_id") val taskId: UUID,
    @JsonProperty("tag_ids") val tagIds: List<UUID>,
)

@RestController
@RequestMapping("/task_tags")
class TaskTagController(private val taskTagService: TaskTagService) {
    @ResponseBody
    @PostMapping
    fun createNewTaskTag(
        @RequestBody CreateTaskTagsRequestBody: CreateTaskTagsRequestBody
    ): ResponseEntity<List<TaskTag>> {
        val newTaskTags = taskTagService.createNewTaskTags(CreateTaskTagsRequestBody)
        return when {
            newTaskTags.isNotEmpty() -> ResponseEntity.status(HttpStatus.CREATED).body(newTaskTags)
            else -> ResponseEntity.status(HttpStatus.NOT_MODIFIED).body(emptyList())
        }
    }

    @ResponseBody
    @DeleteMapping("/{id}")
    fun deleteTaskTagById(@PathVariable id: UUID): ResponseEntity<Unit> =
        when (taskTagService.deleteTaskTagById(id)) {
            true -> ResponseEntity.status(HttpStatus.ACCEPTED).build()
            else -> ResponseEntity.status(HttpStatus.NOT_MODIFIED).build()
        }
}