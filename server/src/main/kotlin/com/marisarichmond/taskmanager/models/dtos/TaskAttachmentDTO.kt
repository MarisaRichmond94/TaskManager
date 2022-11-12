package com.marisarichmond.taskmanager.models.dtos

import com.marisarichmond.taskmanager.models.Attachment
import java.time.Instant
import java.util.*

// Response DTOs
data class TaskAttachmentDTO(
    override val id: UUID,
    val attachment: Attachment,
    val createdAt: Long = Instant.now().epochSecond,
    val updatedAt: Long = Instant.now().epochSecond,
) : BaseDTO(id) {
    override fun toString(): String = this::class.simpleName + "(id = $id, attachmentId = ${attachment.id})"
}

// Request DTOs
data class CreateTaskAttachmentDTO(
    val id: UUID = UUID.randomUUID(),
    val link: String,
    val attachmentTypeId: UUID,
    val name: String,
    val taskId: UUID,
)

data class UpdateTaskAttachmentDTO(
    val link: String? = null,
    val name: String? = null,
    val attachmentTypeId: UUID? = null,
)
