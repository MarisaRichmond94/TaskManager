package com.marisarichmond.taskmanager.models.dtos

import com.marisarichmond.taskmanager.models.AttachmentType
import org.hibernate.Hibernate
import java.time.Instant
import java.util.*

// Response DTOs
data class AttachmentDTO(
    val id: UUID,
    val link: String,
    val type: AttachmentType,
    val name: String,
    val createdAt: Long = Instant.now().epochSecond,
    val updatedAt: Long = Instant.now().epochSecond,
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
