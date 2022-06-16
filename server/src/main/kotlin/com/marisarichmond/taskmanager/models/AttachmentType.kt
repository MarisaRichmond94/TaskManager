package com.marisarichmond.taskmanager.models

import java.util.*
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "attachment_types")
data class AttachmentType(
    @Id
    override val id: UUID = UUID.randomUUID(),
    val name: String,
) : Base(id) {
    override fun toString(): String = this::class.simpleName + "(id = $id, name = $name)"
}
