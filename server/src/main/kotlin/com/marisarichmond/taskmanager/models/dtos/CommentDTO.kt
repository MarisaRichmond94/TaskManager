package com.marisarichmond.taskmanager.models.dtos

import org.hibernate.Hibernate
import java.time.Instant
import java.util.*

// Response DTOs
data class CommentDTO(
    val id: UUID,
    val text: String,
    val createdAt: Instant = Instant.now(),
    val updatedAt: Instant = Instant.now(),
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as CommentDTO

        return id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    override fun toString(): String = this::class.simpleName + "(id = $id, text = $text)"
}

// Request DTOs
data class CreateTaskCommentDTO(
    val id: UUID = UUID.randomUUID(),
    val text: String,
    val taskId: UUID,
)

data class UpdateTaskCommentDTO(val text: String? = null)
