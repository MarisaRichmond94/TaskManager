package com.marisarichmond.taskmanager.models

import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "tasks")
data class Task(
    @Id
    override val id: UUID = UUID.randomUUID(),
    val dueDate: Long = Instant.now().plus(1, ChronoUnit.DAYS).epochSecond,
    val createdAt: Long = Instant.now().epochSecond,
    val updatedAt: Long = Instant.now().epochSecond,
    val isArchived: Boolean = false,
    val isPinned: Boolean = false,
    @OneToOne
    @JoinColumn(name = "user_id")
    val user: User,
    val objective: String? = null,
    val description: String? = null,
) : Base(id) {
    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "objective = $objective",
        "dueDate = $dueDate",
        "description = $description",
        "isArchived = $isArchived",
        "isPinned = $isPinned",
    ).joinToString(", ")
}
