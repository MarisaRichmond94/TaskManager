package com.marisarichmond.taskmanager.models.dtos

import java.time.Instant
import java.util.*

// Response DTOs
data class TaskTagDTO(
    override val id: UUID,
    val tagId: UUID,
    val hexColor: String,
    val name: String,
    val createdAt: Long = Instant.now().epochSecond,
    val updatedAt: Long = Instant.now().epochSecond,
) : BaseDTO(id) {
    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "tagId = $tagId",
        "hexColor = $hexColor",
        "name = $name",
    ).joinToString(", ")
}

// Request DTOs
data class CreateTaskTagDTO(val id: UUID = UUID.randomUUID(), val taskId: UUID, val tagId: UUID)

data class UpdateTaskTagDTO(val tagId: UUID? = null)
