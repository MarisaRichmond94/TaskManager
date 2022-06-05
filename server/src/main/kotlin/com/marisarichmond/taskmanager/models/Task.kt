package com.marisarichmond.taskmanager.models

import org.hibernate.Hibernate
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "tasks")
data class Task(
    @Id
    val id: UUID = UUID.randomUUID(),
    val objective: String,
    val orderIndex: Int,
    val description: String? = null,
    @OneToOne
    @JoinColumn(name = "task_list_id")
    val taskList: TaskList,
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "tag_id")
    val tags: Set<Tag>? = setOf(),
) {
    override fun toString(): String {
        return this::class.simpleName +
            "(id = $id, objective = $objective, orderIndex = $orderIndex, description = $description)"
    }

    override fun hashCode(): Int = super.hashCode()

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as Task

        return id == other.id
    }
}
