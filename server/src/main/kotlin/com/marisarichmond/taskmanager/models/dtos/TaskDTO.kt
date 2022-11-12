package com.marisarichmond.taskmanager.models.dtos

import org.hibernate.Hibernate
import java.util.*

// Response DTOs
data class TaskDTO(
    val id: UUID,
    val dueDate: Long,
    val createdAt: Long,
    val updatedAt: Long,
    val isPinned: Boolean,
    val status: StatusDTO,
    val objective: String? = null,
    val description: String? = null,
    val tags: List<TaskTagDTO>? = emptyList(),
    val checklistItems: List<ChecklistItemDTO> = emptyList(),
    val comments: List<CommentDTO> = emptyList(),
    val attachments: List<AttachmentDTO> = emptyList(),
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as TaskDTO

        return id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "objective = $objective",
        "dueDate = $dueDate",
        "description = $description",
        "isPinned = $isPinned",
    ).joinToString(", ")
}

// Request DTOs
data class CreateTaskDTO(val id: UUID = UUID.randomUUID())

data class UpdateTaskByIdDTO(
    val dueDate: Long? = null,
    val isPinned: Boolean? = null,
    val objective: String? = null,
    val description: String? = null,
)
