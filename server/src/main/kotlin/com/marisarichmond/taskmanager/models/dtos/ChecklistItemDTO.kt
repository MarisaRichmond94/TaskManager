package com.marisarichmond.taskmanager.models.dtos

import org.hibernate.Hibernate
import java.time.Instant
import java.util.*

// Response DTOs
data class ChecklistItemDTO(
    val id: UUID,
    val description: String,
    val isCompleted: Boolean = false,
    val orderIndex: Int,
    val createdAt: Instant = Instant.now(),
    val updatedAt: Instant = Instant.now(),
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as ChecklistItemDTO

        return id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "description = $description",
        "isCompleted = $isCompleted",
        "orderIndex = $orderIndex",
    ).joinToString(", ")
}

// Request DTOs
data class CreateTaskChecklistItemDTO(
    val id: UUID = UUID.randomUUID(),
    val description: String,
    val taskId: UUID,
)

data class UpdateTaskChecklistItemDTO(
    val description: String? = null,
    val isCompleted: Boolean? = null,
    val orderIndex: Int? = null,
)
