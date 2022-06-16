package com.marisarichmond.taskmanager.models

import java.time.Instant
import java.util.*
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "comments")
data class Comment(
    @Id
    override val id: UUID = UUID.randomUUID(),
    val text: String,
    val createdAt: Instant = Instant.now(),
    val updatedAt: Instant = Instant.now(),
) : Base(id) {
    override fun toString(): String = this::class.simpleName + "(id = $id, text = $text)"
}
