package com.marisarichmond.taskmanager.models

import com.marisarichmond.taskmanager.models.dtos.NoteTagDTO
import java.time.Instant
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "note_tags")
data class NoteTag(
    @Id
    override val id: UUID = UUID.randomUUID(),
    val createdAt: Long = Instant.now().epochSecond,
    val updatedAt: Long = Instant.now().epochSecond,
    @OneToOne
    @JoinColumn(name = "note_id")
    val note: Note,
    @OneToOne
    @JoinColumn(name = "tag_id")
    val tag: Tag,
) : Base(id)

fun NoteTag.toDTO(): NoteTagDTO = this.run {
    NoteTagDTO(
        id = id,
        noteId = note.id,
        tagId = tag.id,
        hexColor = tag.hexColor,
        name = tag.name,
        createdAt = createdAt,
        updatedAt = updatedAt,
    )
}
