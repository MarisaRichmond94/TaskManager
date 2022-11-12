package com.marisarichmond.taskmanager.models.dtos

import java.time.Instant
import java.util.*

// Response DTOs
data class StatusDTO(
    override val id: UUID,
    val name: String,
    val createdAt: Long = Instant.now().epochSecond,
    val updatedAt: Long = Instant.now().epochSecond,
) : BaseDTO(id) {
    override fun toString(): String = this::class.simpleName + "(id = $id, name = $name)"
}

// Request DTOs
data class UpdateTaskStatusDTO(val statusTypeId: UUID? = null)
