package com.marisarichmond.taskmanager.models

import org.hibernate.Hibernate
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "attachments")
data class Attachment(
    @Id
    val id: UUID = UUID.randomUUID(),
    val link: String,
    val name: String? = null,
    @OneToOne
    @JoinColumn(name = "task_id")
    val task: Task,
    @OneToOne
    @JoinColumn(name = "attachment_type_id")
    val attachmentType: AttachmentType,
) {
    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "link = $link",
        "name = $name",
    ).joinToString(", ")

    override fun hashCode(): Int = super.hashCode()

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as Attachment

        return id == other.id
    }
}
