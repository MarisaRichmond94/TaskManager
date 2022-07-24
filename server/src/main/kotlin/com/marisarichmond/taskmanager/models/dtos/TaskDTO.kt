package com.marisarichmond.taskmanager.models.dtos

import org.hibernate.Hibernate
import java.util.*

// Response DTOs
data class TaskDTO(
    val id: UUID,
    val dueDate: Long,
    val createdAt: Long,
    val updatedAt: Long,
    val isArchived: Boolean,
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
        "isArchived = $isArchived",
    ).joinToString(", ")
}

// Request DTOs
data class CreateNewTaskDTO(val id: UUID = UUID.randomUUID(), val dueDate: Long)

data class UpdateTaskByIdDTO(
    val dueDate: Long? = null,
    val isArchived: Boolean? = null,
    val isPinned: Boolean? = null,
    val objective: String? = null,
    val description: String? = null,
)
