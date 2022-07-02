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
    val objective: String,
    val dueDate: Instant = Instant.now().plus(1, ChronoUnit.DAYS),
    val createdAt: Instant = Instant.now(),
    val updatedAt: Instant = Instant.now(),
    val isPinned: Boolean = false,
    @OneToOne
    @JoinColumn(name = "user_id")
    val user: User,
    val description: String? = null,
) : Base(id) {
    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "objective = $objective",
        "dueDate = $dueDate",
        "description = $description",
        "isPinned = $isPinned",
    ).joinToString(", ")
}
