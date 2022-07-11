package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.models.Comment
import com.marisarichmond.taskmanager.models.dtos.CommentDTO
import com.marisarichmond.taskmanager.models.dtos.CreateTaskCommentDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskCommentDTO
import com.marisarichmond.taskmanager.models.toDTO
import com.marisarichmond.taskmanager.repositories.CommentRepository
import mu.KotlinLogging
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*
import javax.transaction.Transactional

@Service
class CommentService(
    private val commentRepository: CommentRepository,
    private val taskService: TaskService,
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    @Transactional
    fun create(createTaskCommentDTO: CreateTaskCommentDTO): CommentDTO? = try {
        createTaskCommentDTO.run {
            Comment(
                id = id,
                text = text,
                task = taskService.getById(taskId),
            ).let { commentRepository.save(it).toDTO() }
        }
    } catch (exception: Exception) {
        logger.error(exception) { "Failed to create Comment: $exception." }
        null
    }

    fun getByTaskId(taskId: UUID): List<Comment> = commentRepository.findAllByTaskId(taskId)

    @Transactional
    fun updateById(id: UUID, updateTaskCommentDTO: UpdateTaskCommentDTO): CommentDTO? = try {
        updateTaskCommentDTO.run {
            commentRepository.getById(id).let { existingComment ->
                commentRepository.save(
                    existingComment.copy(
                        text = text ?: existingComment.text,
                        updatedAt = Instant.now(),
                    )
                ).toDTO()
            }
        }
    } catch (exception: Exception) {
        logger.error(exception) { "Failed to update Comment: $exception." }
        null
    }

    @Transactional
    fun deleteById(id: UUID): Boolean = try {
        commentRepository.deleteById(id)
        true
    } catch (exception: Exception) {
        logger.error(exception) { "Failed to delete Comment: $exception." }
        false
    }

    fun deleteByTaskId(taskId: UUID) = commentRepository.deleteAllByTaskId(taskId)
}
