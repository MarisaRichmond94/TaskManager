package com.marisarichmond.taskmanager.models.dtos

import com.marisarichmond.taskmanager.models.Attachment
import com.marisarichmond.taskmanager.models.AttachmentType
import org.hibernate.Hibernate
import java.util.*

// Response DTOs
data class NoteAttachmentDTO(
    val id: UUID,
    val link: String,
    val name: String,
    val attachmentType: AttachmentType,
    val createdAt: Long,
    val updatedAt: Long,
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as NoteAttachmentDTO

        return id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "link = $link",
        "name = $name",
        "attachmentType = ${attachmentType.name}",
    ).joinToString(", ")
}

// Request DTOs
data class CreateNoteAttachmentDTO(
    val id: UUID = UUID.randomUUID(),
    val noteId: UUID,
    val attachment: Attachment? = null,
)
