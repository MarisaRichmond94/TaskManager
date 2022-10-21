package com.marisarichmond.taskmanager.models

import java.time.Instant
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "notes")
data class Note(
    @Id
    override val id: UUID = UUID.randomUUID(),
    val title: String,
    val text: String = "",
    val createdAt: Long = Instant.now().epochSecond,
    val updatedAt: Long = Instant.now().epochSecond,
    @OneToOne
    @JoinColumn(name = "section_id")
    val section: Section,
    @OneToOne
    @JoinColumn(name = "user_id")
    val user: User,
) : Base(id) {
    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "title = $title",
    ).joinToString(", ")
}
