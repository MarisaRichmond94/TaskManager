package com.marisarichmond.taskmanager.models.dtos

import java.util.*

// Response DTOs
data class SectionDTO(
    override val id: UUID,
    val title: String,
    val createdAt: Long,
    val updatedAt: Long,
) : BaseDTO(id) {
    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "title = $title",
    ).joinToString(", ")
}

// Request DTOs
data class CreateNewSectionDTO(val id: UUID = UUID.randomUUID(), val title: String)

data class UpdateSectionByIdDTO(val title: String)
