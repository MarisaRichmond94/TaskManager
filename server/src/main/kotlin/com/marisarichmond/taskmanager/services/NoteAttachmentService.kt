package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.Action
import com.marisarichmond.taskmanager.exceptions.UpstreamEntityOperationException
import com.marisarichmond.taskmanager.models.Attachment
import com.marisarichmond.taskmanager.models.NoteAttachment
import com.marisarichmond.taskmanager.models.dtos.CreateNoteAttachmentDTO
import com.marisarichmond.taskmanager.models.dtos.NoteAttachmentDTO
import com.marisarichmond.taskmanager.models.toDTO
import com.marisarichmond.taskmanager.repositories.NoteAttachmentRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class NoteAttachmentService(
    private val noteAttachmentRepository: NoteAttachmentRepository,
    private val noteService: NoteService,
) {
    fun getById(id: UUID): NoteAttachment = noteAttachmentRepository.getById(id)
    
    fun getByNoteId(noteId: UUID): List<NoteAttachment> = noteAttachmentRepository.findAllByNoteId(noteId)

    fun create(createNoteAttachmentDTO: CreateNoteAttachmentDTO): NoteAttachmentDTO = createNoteAttachmentDTO.run {
        if (attachment === null) throw UpstreamEntityOperationException(Action.CREATE, Attachment::class.simpleName)

        NoteAttachment(
            id = id,
            attachment = attachment,
            note = noteService.getById(noteId),
        ).let { noteAttachmentRepository.save(it).toDTO() }
    }

    fun deleteById(id: UUID) = noteAttachmentRepository.deleteById(id)

    fun deleteByNoteId(noteId: UUID) = noteAttachmentRepository.deleteAllByNoteId(noteId)
}
