package com.marisarichmond.taskmanager.models.dtos

import org.hibernate.Hibernate
import java.util.*

data class NoteDTO(
    val id: UUID,
    val title: String,
    val sectionId: UUID,
    val createdAt: Long,
    val updatedAt: Long,
    val text: String = "",
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as NoteDTO

        return id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "title = $title",
    ).joinToString(", ")
}

// Request DTOs
data class CreateNewNoteDTO(val id: UUID = UUID.randomUUID(), val title: String)

data class UpdateNoteByIdDTO(
    val title: String? = null,
    val text: String? = null,
    val sectionId: UUID? = null,
)