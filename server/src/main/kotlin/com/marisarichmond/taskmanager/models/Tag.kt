package com.marisarichmond.taskmanager.models

import org.hibernate.Hibernate
import java.util.UUID
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.OneToOne
import javax.persistence.Table

@Entity
@Table(name = "tags")
data class Tag(
    @Id
    val id: UUID = UUID.randomUUID(),
    val name: String,
    @OneToOne
    @JoinColumn(name = "user_id")
    val user: User
) {
    override fun toString(): String = this::class.simpleName + "(id = $id, name = $name)"

    override fun hashCode(): Int = super.hashCode()

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as Tag

        return id == other.id
    }
}
