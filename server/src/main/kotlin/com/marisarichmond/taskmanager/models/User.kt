package com.marisarichmond.taskmanager.models

import org.hibernate.Hibernate
import java.util.UUID
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "users")
data class User(
    @Id
    val id: UUID = UUID.randomUUID(),
    val firstName: String,
    val lastName: String,
    val email: String
) {
    override fun toString(): String = this::class.simpleName +
        "(id = $id, firstName = $firstName, lastName = $lastName, email = $email)"

    override fun hashCode(): Int = super.hashCode()

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as User

        return id == other.id
    }
}
