package com.marisarichmond.taskmanager.models

import org.hibernate.Hibernate
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "task_tags")
data class TaskTag(
    @Id
    val id: UUID = UUID.randomUUID(),
    @OneToOne
    @JoinColumn(name = "task_id")
    val task: Task,
    @OneToOne
    @JoinColumn(name = "tag_id")
    val tag: Tag,
) {
    override fun toString(): String = this::class.simpleName + "(id = $id)"

    override fun hashCode(): Int = super.hashCode()

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as TaskTag

        return id == other.id
    }
}
