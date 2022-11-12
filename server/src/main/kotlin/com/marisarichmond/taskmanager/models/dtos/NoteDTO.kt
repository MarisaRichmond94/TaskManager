package com.marisarichmond.taskmanager.models.dtos

import java.util.*

// Response DTOs
data class NoteDTO(
    override val id: UUID,
    val title: String,
    val text: String = "",
    val sectionId: UUID,
    val tags: List<NoteTagDTO>? = emptyList(),
    val attachments: List<NoteAttachmentDTO> = emptyList(),
    val createdAt: Long,
    val updatedAt: Long,
) : BaseDTO(id) {
    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "title = $title",
    ).joinToString(", ")
}

// Request DTOs
data class CreateNoteDTO(val id: UUID = UUID.randomUUID(), val title: String, val sectionId: UUID)

data class UpdateNoteByIdDTO(
    val title: String? = null,
    val text: String? = null,
    val sectionId: UUID? = null,
)
