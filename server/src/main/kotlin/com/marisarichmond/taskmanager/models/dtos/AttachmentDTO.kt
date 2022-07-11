package com.marisarichmond.taskmanager.models.dtos

import org.hibernate.Hibernate
import java.util.*

// Response DTOs
data class AttachmentDTO(
    val id: UUID,
    val link: String,
    val type: String,
    val name: String? = null,
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as AttachmentDTO

        return id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "link = $link",
        "type = $type",
        "name = $name",
    ).joinToString(", ")
}

// Request DTOs
data class CreateTaskAttachmentDTO(
    val id: UUID = UUID.randomUUID(),
    val link: String,
    val taskId: UUID,
    val attachmentTypeId: UUID,
    val name: String? = null,
)

data class UpdateTaskAttachmentDTO(
    val link: String? = null,
    val name: String? = null,
    val taskId: UUID? = null,
    val attachmentTypeId: UUID? = null,
)
