package com.marisarichmond.taskmanager.models

import com.marisarichmond.taskmanager.exceptions.EntityValidationException
import com.marisarichmond.taskmanager.extensions.isAlphaOnly
import com.marisarichmond.taskmanager.extensions.isValidEmail
import org.hibernate.Hibernate
import java.util.*
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

/**
 * Explicit validation functionality to ensure that a user's first and last name only contain alpha characters
 * and that the given email is a valid email address.
 */
@Throws(EntityValidationException::class)
fun User.validateFields(): User {
    when {
        !this.firstName.isAlphaOnly() -> {
            throw EntityValidationException(
                this::class::simpleName.toString(),
                "firstName",
                this.firstName,
                "Only alphabet types allowed",
            )
        }
        !this.lastName.isAlphaOnly() -> {
            throw EntityValidationException(
                this::class::simpleName.toString(),
                "lastName",
                this.lastName,
                "Only alphabet types allowed",
            )
        }
        !this.email.isValidEmail() -> {
            throw EntityValidationException(
                this::class::simpleName.toString(),
                "email",
                this.email,
                "Invalid email address format"
            )
        }
    }

    return this
}

