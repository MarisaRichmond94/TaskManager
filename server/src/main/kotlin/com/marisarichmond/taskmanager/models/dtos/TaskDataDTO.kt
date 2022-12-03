package com.marisarichmond.taskmanager.models.dtos

import com.marisarichmond.taskmanager.models.AttachmentType
import com.marisarichmond.taskmanager.models.StatusType
import com.marisarichmond.taskmanager.models.Tag

data class TaskDataDTO(
    val attachmentTypes: List<AttachmentType> = emptyList(),
    val statusTypes: List<StatusType> = emptyList(),
    val tasks: List<TaskDTO> = emptyList(),
    val taskTemplates: List<TaskTemplateDTO> = emptyList(),
    val tags: List<Tag> = emptyList(),
)
