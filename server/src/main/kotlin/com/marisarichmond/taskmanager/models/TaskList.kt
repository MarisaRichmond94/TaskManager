package com.marisarichmond.taskmanager.models

import org.hibernate.Hibernate
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "task_lists")
data class TaskList(
    @Id
    val id: UUID = UUID.randomUUID(),
    val name: String,
    val description: String? = null,
    @OneToOne
    @JoinColumn(name = "user_id")
    val user: User,
) {
    override fun toString(): String = this::class.simpleName + "(id = $id, name = $name, description = $description)"

    override fun hashCode(): Int = super.hashCode()

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as TaskList

        return id == other.id
    }
}
