package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.Comment
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
class CommentController(private val commentService: CommentService) : BaseController(Comment::class.simpleName) {
    @ResponseBody
    @PostMapping
    fun create(
        @RequestBody createTaskCommentDTO: CreateTaskCommentDTO,
    ): ResponseEntity<CommentDTO> = try {
        ResponseEntity
            .status(HttpStatus.CREATED)
            .body(commentService.create(createTaskCommentDTO))
    } catch (exception: Exception) {
        throw baseControllerException(Action.CREATE, exception)
    }

    @ResponseBody
    @PatchMapping("/{id}")
    fun updateById(
        @PathVariable id: UUID,
        @RequestBody updateTaskCommentDTO: UpdateTaskCommentDTO,
    ): ResponseEntity<CommentDTO> = try {
        ResponseEntity
            .status(HttpStatus.ACCEPTED)
            .body(commentService.updateById(id, updateTaskCommentDTO))
    } catch (exception: Exception) {
        throw baseControllerException(Action.UPDATE, exception)
    }

    @ResponseBody
    @DeleteMapping("/{id}")
    fun deleteById(
        @PathVariable id: UUID,
    ): ResponseEntity<String> = try {
        commentService.deleteById(id)
        ResponseEntity
            .status(HttpStatus.ACCEPTED)
            .body("${Comment::class.simpleName} successfully deleted.")
    } catch (exception: Exception) {
        throw baseControllerException(Action.DELETE, exception)
    }
}
