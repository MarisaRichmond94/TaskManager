package com.marisarichmond.taskmanager.models.dtos

import java.time.Instant
import java.util.*

// Response DTOs
data class ChecklistItemDTO(
    override val id: UUID,
    val description: String,
    val isCompleted: Boolean = false,
    val orderIndex: Int,
    val createdAt: Long = Instant.now().epochSecond,
    val updatedAt: Long = Instant.now().epochSecond,
) : BaseDTO(id) {
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
