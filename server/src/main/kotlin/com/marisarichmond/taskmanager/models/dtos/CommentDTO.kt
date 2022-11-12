package com.marisarichmond.taskmanager.models.dtos

import java.time.Instant
import java.util.*

// Response DTOs
data class CommentDTO(
    override val id: UUID,
    val text: String,
    val createdAt: Long = Instant.now().epochSecond,
    val updatedAt: Long = Instant.now().epochSecond,
) : BaseDTO(id) {
    override fun toString(): String = this::class.simpleName + "(id = $id, text = $text)"
}

// Request DTOs
data class CreateTaskCommentDTO(
    val id: UUID = UUID.randomUUID(),
    val text: String,
    val taskId: UUID,
)

data class UpdateTaskCommentDTO(val text: String? = null)
