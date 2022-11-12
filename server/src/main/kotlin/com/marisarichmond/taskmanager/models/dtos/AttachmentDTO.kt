package com.marisarichmond.taskmanager.models.dtos

import com.marisarichmond.taskmanager.models.AttachmentType
import java.time.Instant
import java.util.*

// Response DTOs
data class AttachmentDTO(
    override val id: UUID,
    val link: String,
    val type: AttachmentType,
    val name: String,
    val createdAt: Long = Instant.now().epochSecond,
    val updatedAt: Long = Instant.now().epochSecond,
) : BaseDTO(id) {
    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "link = $link",
        "type = $type",
        "name = $name",
    ).joinToString(", ")
}

// Request DTOs
data class CreateAttachmentDTO(
    val id: UUID = UUID.randomUUID(),
    val link: String,
    val attachmentTypeId: UUID,
    val name: String,
)

data class UpdateAttachmentDTO(
    val link: String? = null,
    val name: String? = null,
    val attachmentTypeId: UUID? = null,
)
