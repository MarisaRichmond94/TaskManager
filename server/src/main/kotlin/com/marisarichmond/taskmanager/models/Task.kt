package com.marisarichmond.taskmanager.models

import org.hibernate.Hibernate
import java.time.Instant
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "tasks")
data class Task(
    @Id
    val id: UUID = UUID.randomUUID(),
    val objective: String,
    val dueDate: Instant = Instant.now(),
    val createdAt: Instant = Instant.now(),
    val updatedAt: Instant = Instant.now(),
    val isPinned: Boolean = false,
    @OneToOne
    @JoinColumn(name = "user_id")
    val user: User,
    val description: String? = null,
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "tag_id")
    val tags: Set<Tag>? = setOf(),
) {
    override fun toString(): String {
        return this::class.simpleName +
            "(id = $id, objective = $objective, dueDate = $dueDate, description = $description, isPinned = $isPinned)"
    }

    override fun hashCode(): Int = super.hashCode()

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as Task

        return id == other.id
    }
}
