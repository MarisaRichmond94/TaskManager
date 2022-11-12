package com.marisarichmond.taskmanager.models.dtos

import com.marisarichmond.taskmanager.models.Attachment
import com.marisarichmond.taskmanager.models.AttachmentType
import java.util.*

// Response DTOs
data class NoteAttachmentDTO(
    override val id: UUID,
    val attachmentId: UUID,
    val link: String,
    val name: String,
    val attachmentType: AttachmentType,
    val createdAt: Long,
    val updatedAt: Long,
) : BaseDTO(id) {
    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "attachmentId = $attachmentId",
        "link = $link",
        "name = $name",
        "attachmentType = ${attachmentType.name}",
    ).joinToString(", ")
}

// Request DTOs
data class CreateNoteAttachmentDTO(
    val id: UUID = UUID.randomUUID(),
    val link: String,
    val attachmentTypeId: UUID,
    val name: String,
    val noteId: UUID,
    val attachment: Attachment? = null,
)
