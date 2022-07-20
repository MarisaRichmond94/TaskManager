package com.marisarichmond.taskmanager.models.dtos

import org.hibernate.Hibernate
import java.time.Instant
import java.util.*

// Response DTOs
data class TaskTagDTO(
    val id: UUID,
    val tagId: UUID,
    val tagName: String,
    val createdAt: Long = Instant.now().epochSecond,
    val updatedAt: Long = Instant.now().epochSecond,
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as TaskTagDTO

        return id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    override fun toString(): String = this::class.simpleName + "(id = $id, tagId = $tagId, tagName = $tagName)"
}

// Request DTOs
data class CreateTaskTagDTO(val id: UUID = UUID.randomUUID(), val taskId: UUID, val tagId: UUID)

data class UpdateTaskTagDTO(val tagId: UUID? = null)
