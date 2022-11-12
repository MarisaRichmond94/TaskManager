package com.marisarichmond.taskmanager.models.dtos

import java.time.Instant
import java.util.*

// Response DTOs
data class NoteTagDTO(
    override val id: UUID,
    val noteId: UUID,
    val tagId: UUID,
    val hexColor: String,
    val name: String,
    val createdAt: Long = Instant.now().epochSecond,
    val updatedAt: Long = Instant.now().epochSecond,
) : BaseDTO(id) {
    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "noteId = $noteId",
        "tagId = $tagId",
        "hexColor = $hexColor",
        "name = $name",
    ).joinToString(", ")
}

// Request DTOs
data class CreateNoteTagDTO(
    val id: UUID = UUID.randomUUID(),
    val noteId: UUID,
    val tagId: UUID,
)
