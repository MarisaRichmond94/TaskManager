package com.marisarichmond.taskmanager.models

import com.marisarichmond.taskmanager.models.dtos.TaskTagDTO
import java.time.Instant
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "task_tags")
data class TaskTag(
    @Id
    override val id: UUID = UUID.randomUUID(),
    val createdAt: Long = Instant.now().epochSecond,
    val updatedAt: Long = Instant.now().epochSecond,
    @OneToOne
    @JoinColumn(name = "task_id")
    val task: Task,
    @OneToOne
    @JoinColumn(name = "tag_id")
    val tag: Tag,
) : Base(id)

fun TaskTag.toDTO(): TaskTagDTO =
    this.run {
        TaskTagDTO(
            id = id,
            tagId = tag.id,
            tagName = tag.name,
            createdAt = createdAt,
            updatedAt = updatedAt,
        )
    }
