package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.dtos.CommentDTO
import com.marisarichmond.taskmanager.models.dtos.CreateTaskCommentDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskCommentDTO
import com.marisarichmond.taskmanager.services.CommentService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@CrossOrigin(origins = ["*"])
@RestController
@RequestMapping("/api/private/comments")
class CommentController(private val commentService: CommentService) {
    @ResponseBody
    @PostMapping
    fun create(@RequestBody createTaskCommentDTO: CreateTaskCommentDTO): ResponseEntity<CommentDTO?> =
        when (val taskComment = commentService.create(createTaskCommentDTO)) {
            is CommentDTO -> ResponseEntity.status(HttpStatus.CREATED).body(taskComment)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }

    @ResponseBody
    @PatchMapping("/{id}")
    fun updateById(
        @PathVariable id: UUID,
        @RequestBody updateTaskCommentDTO: UpdateTaskCommentDTO,
    ): ResponseEntity<CommentDTO?> =
        when (val updatedTaskComment = commentService.updateById(id, updateTaskCommentDTO)) {
            is CommentDTO -> ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedTaskComment)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }

    @ResponseBody
    @DeleteMapping("/{id}")
    fun deleteById(@PathVariable id: UUID): ResponseEntity<String> =
        if (commentService.deleteById(id)) ResponseEntity.status(HttpStatus.ACCEPTED).body("Comment successfully deleted.")
        else ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete Comment with id \"$id\".")
}
