package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.models.Comment
import com.marisarichmond.taskmanager.models.dtos.CommentDTO
import com.marisarichmond.taskmanager.models.dtos.CreateTaskCommentDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskCommentDTO
import com.marisarichmond.taskmanager.models.toDTO
import com.marisarichmond.taskmanager.repositories.CommentRepository
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*
import javax.transaction.Transactional

@Service
class CommentService(
    private val commentRepository: CommentRepository,
    private val taskService: TaskService,
) {
    fun getByTaskId(taskId: UUID): List<Comment> = commentRepository.findAllByTaskId(taskId)

    @Transactional
    fun create(createTaskCommentDTO: CreateTaskCommentDTO): CommentDTO = createTaskCommentDTO.run {
        Comment(
            id = id,
            text = text,
            task = taskService.getById(taskId),
        ).let { commentRepository.save(it).toDTO() }
    }

    @Transactional
    fun updateById(id: UUID, updateTaskCommentDTO: UpdateTaskCommentDTO): CommentDTO = updateTaskCommentDTO.run {
        commentRepository.getById(id).let { existingComment ->
            commentRepository.save(
                existingComment.copy(
                    text = text ?: existingComment.text,
                    updatedAt = Instant.now().epochSecond,
                )
            ).toDTO()
        }
    }

    @Transactional
    fun deleteById(id: UUID) = commentRepository.deleteById(id)

    fun deleteByTaskId(taskId: UUID) = commentRepository.deleteAllByTaskId(taskId)
}
