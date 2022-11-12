package com.marisarichmond.taskmanager.models.dtos

import com.marisarichmond.taskmanager.models.AttachmentType
import com.marisarichmond.taskmanager.models.Tag

data class NoteDataDTO(
    val attachmentTypes: List<AttachmentType> = emptyList(),
    val notes: List<NoteDTO> = emptyList(),
    val sections: List<SectionDTO> = emptyList(),
    val tags: List<Tag> = emptyList(),
)
