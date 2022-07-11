package com.marisarichmond.taskmanager.models

import com.marisarichmond.taskmanager.models.dtos.CommentDTO
import java.time.Instant
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "comments")
data class Comment(
    @Id
    override val id: UUID = UUID.randomUUID(),
    val text: String,
    val createdAt: Instant = Instant.now(),
    val updatedAt: Instant = Instant.now(),
    @OneToOne
    @JoinColumn(name = "task_id")
    val task: Task,
) : Base(id) {
    override fun toString(): String = this::class.simpleName + "(id = $id, text = $text)"
}

fun Comment.toDTO(): CommentDTO =
    this.run {
        CommentDTO(
            id = id,
            text = text,
            createdAt = createdAt,
            updatedAt = updatedAt,
        )
    }
