package com.marisarichmond.taskmanager.models

import java.time.Instant
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "tags")
data class Tag(
    @Id
    override val id: UUID = UUID.randomUUID(),
    val name: String,
    val hexColor: String = "#868686",
    val createdAt: Long = Instant.now().epochSecond,
    val updatedAt: Long = Instant.now().epochSecond,
    @OneToOne
    @JoinColumn(name = "user_id")
    val user: User,
) : Base(id) {
    override fun toString(): String = this::class.simpleName + "(id = $id, name = $name)"
}
