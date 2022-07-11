package com.marisarichmond.taskmanager.models

import com.marisarichmond.taskmanager.models.dtos.AttachmentDTO
import java.time.Instant
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "attachments")
data class Attachment(
    @Id
    override val id: UUID = UUID.randomUUID(),
    val link: String,
    val name: String? = null,
    val createdAt: Instant = Instant.now(),
    val updatedAt: Instant = Instant.now(),
    @OneToOne
    @JoinColumn(name = "task_id")
    val task: Task,
    @OneToOne
    @JoinColumn(name = "attachment_type_id")
    val attachmentType: AttachmentType,
) : Base(id) {
    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "link = $link",
        "name = $name",
    ).joinToString(", ")
}

fun Attachment.toDTO(): AttachmentDTO =
    this.run {
        AttachmentDTO(
            id = id,
            link = link,
            type = attachmentType.name,
            name = name,
            createdAt = createdAt,
            updatedAt = updatedAt,
        )
    }
