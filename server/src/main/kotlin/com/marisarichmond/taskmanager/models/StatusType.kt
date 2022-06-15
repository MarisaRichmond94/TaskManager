package com.marisarichmond.taskmanager.models

import org.hibernate.Hibernate
import java.util.*
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "status_types")
data class StatusType(
    @Id
    val id: UUID = UUID.randomUUID(),
    val name: String,
) {
    override fun toString(): String = this::class.simpleName + "(id = $id, name = $name)"

    override fun hashCode(): Int = super.hashCode()

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as StatusType

        return id == other.id
    }
}
