package com.marisarichmond.taskmanager.models

import com.marisarichmond.taskmanager.models.dtos.StatusDTO
import java.time.Instant
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "statuses")
data class Status(
    @Id
    override val id: UUID = UUID.randomUUID(),
    val createdAt: Long = Instant.now().epochSecond,
    val updatedAt: Long = Instant.now().epochSecond,
    @OneToOne
    @JoinColumn(name = "task_id")
    val task: Task,
    @OneToOne
    @JoinColumn(name = "status_type_id")
    val statusType: StatusType,
) : Base(id)

fun Status.toDTO(): StatusDTO = this.run {
    StatusDTO(
        id = id,
        name = statusType.name,
        createdAt = createdAt,
        updatedAt = updatedAt,
    )
}
