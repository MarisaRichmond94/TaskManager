package com.marisarichmond.taskmanager.models

import com.marisarichmond.taskmanager.models.dtos.TaskAttachmentDTO
import java.time.Instant
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "task_attachments")
data class TaskAttachment(
    @Id
    override val id: UUID = UUID.randomUUID(),
    val createdAt: Long = Instant.now().epochSecond,
    val updatedAt: Long = Instant.now().epochSecond,
    @OneToOne
    @JoinColumn(name = "task_id")
    val task: Task,
    @OneToOne
    @JoinColumn(name = "attachment_id")
    val attachment: Attachment,
) : Base(id)

fun TaskAttachment.toDTO(): TaskAttachmentDTO =
    this.run {
        TaskAttachmentDTO(
            id = id,
            attachment = attachment,
            createdAt = createdAt,
            updatedAt = updatedAt,
        )
    }
