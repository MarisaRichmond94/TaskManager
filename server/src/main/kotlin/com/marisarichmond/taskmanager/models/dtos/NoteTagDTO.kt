package com.marisarichmond.taskmanager.models.dtos

import org.hibernate.Hibernate
import java.time.Instant
import java.util.*

// Response DTOs
data class NoteTagDTO(
    val id: UUID,
    val noteId: UUID,
    val tagId: UUID,
    val hexColor: String,
    val name: String,
    val createdAt: Long = Instant.now().epochSecond,
    val updatedAt: Long = Instant.now().epochSecond,
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as NoteTagDTO

        return id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "noteId = $noteId",
        "tagId = $tagId",
        "hexColor = $hexColor",
        "name = $name",
    ).joinToString(", ")
}

// Request DTOs
data class CreateNoteTagDTO(
    val id: UUID = UUID.randomUUID(),
    val noteId: UUID,
    val tagId: UUID,
)
