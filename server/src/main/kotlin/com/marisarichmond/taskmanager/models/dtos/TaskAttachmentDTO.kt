package com.marisarichmond.taskmanager.models.dtos

import com.marisarichmond.taskmanager.models.Attachment
import org.hibernate.Hibernate
import java.time.Instant
import java.util.*

// Response DTOs
data class TaskAttachmentDTO(
    val id: UUID,
    val attachment: Attachment,
    val createdAt: Long = Instant.now().epochSecond,
    val updatedAt: Long = Instant.now().epochSecond,
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as TaskAttachmentDTO

        return id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    override fun toString(): String = this::class.simpleName + "(id = $id, attachmentId = ${attachment.id})"
}

// Request DTOs
data class CreateTaskAttachmentDTO(
    val id: UUID = UUID.randomUUID(),
    val link: String,
    val attachmentTypeId: UUID,
    val name: String,
    val taskId: UUID,
    val attachment: Attachment? = null,
)

data class UpdateTaskAttachmentDTO(
    val link: String? = null,
    val name: String? = null,
    val attachmentTypeId: UUID? = null,
)
