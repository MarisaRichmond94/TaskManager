package com.marisarichmond.taskmanager.models.dtos

import com.marisarichmond.taskmanager.models.AttachmentType
import java.util.*

data class TaskTemplateDTO(
    override val id: UUID,
    val type: String,
    val attachmentType: AttachmentType,
) : BaseDTO(id) {
    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "type = $type",
        "attachmentType = ${attachmentType.name}",
    ).joinToString(", ")
}
