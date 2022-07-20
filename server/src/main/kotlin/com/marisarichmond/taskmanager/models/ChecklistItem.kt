package com.marisarichmond.taskmanager.models

import com.marisarichmond.taskmanager.models.dtos.ChecklistItemDTO
import java.time.Instant
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "checklist_items")
data class ChecklistItem(
    @Id
    override val id: UUID = UUID.randomUUID(),
    val description: String,
    val isCompleted: Boolean = false,
    val orderIndex: Int,
    val createdAt: Long = Instant.now().epochSecond,
    val updatedAt: Long = Instant.now().epochSecond,
    @ManyToOne
    @JoinColumn(name = "task_id")
    val task: Task,
) : Base(id) {
    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "description = $description",
        "isCompleted = $isCompleted",
        "orderIndex = $orderIndex",
    ).joinToString(", ")
}

fun ChecklistItem.toDTO(): ChecklistItemDTO =
    this.run {
        ChecklistItemDTO(
            id = id,
            description = description,
            isCompleted = isCompleted,
            orderIndex = orderIndex,
            createdAt = createdAt,
            updatedAt = updatedAt,
        )
    }
