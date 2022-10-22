package com.marisarichmond.taskmanager.models

import com.marisarichmond.taskmanager.models.dtos.SectionDTO
import java.time.Instant
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "sections")
data class Section(
    @Id
    override val id: UUID = UUID.randomUUID(),
    val title: String,
    val createdAt: Long = Instant.now().epochSecond,
    val updatedAt: Long = Instant.now().epochSecond,
    @OneToOne
    @JoinColumn(name = "user_id")
    val user: User,
) : Base(id) {
    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "title = $title",
    ).joinToString(", ")
}

fun Section.toDTO(): SectionDTO =
    this.run {
        SectionDTO(
            id = id,
            title = title,
            createdAt = createdAt,
            updatedAt = updatedAt,
        )
    }
