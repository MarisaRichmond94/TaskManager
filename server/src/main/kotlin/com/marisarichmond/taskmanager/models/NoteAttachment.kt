package com.marisarichmond.taskmanager.models

import com.marisarichmond.taskmanager.models.dtos.NoteAttachmentDTO
import java.time.Instant
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "note_attachments")
data class NoteAttachment(
    @Id
    override val id: UUID = UUID.randomUUID(),
    val createdAt: Long = Instant.now().epochSecond,
    val updatedAt: Long = Instant.now().epochSecond,
    @OneToOne
    @JoinColumn(name = "note_id")
    val note: Note,
    @OneToOne
    @JoinColumn(name = "attachment_id")
    val attachment: Attachment,
) : Base(id)

fun NoteAttachment.toDTO(): NoteAttachmentDTO = this.run {
    NoteAttachmentDTO(
        id = id,
        noteId = note.id,
        attachmentId = attachment.id,
        link = attachment.link,
        name = attachment.name,
        attachmentType = attachment.attachmentType,
        createdAt = createdAt,
        updatedAt = updatedAt,
    )
}
