package com.marisarichmond.taskmanager.models.dtos

import org.hibernate.Hibernate
import java.util.*

// Response DTOs
data class SectionDTO(
    val id: UUID,
    val title: String,
    val createdAt: Long,
    val updatedAt: Long,
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as SectionDTO

        return id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "title = $title",
    ).joinToString(", ")
}

// Request DTOs
data class CreateNewSectionDTO(val id: UUID = UUID.randomUUID(), val title: String)

data class UpdateSectionByIdDTO(val title: String)
