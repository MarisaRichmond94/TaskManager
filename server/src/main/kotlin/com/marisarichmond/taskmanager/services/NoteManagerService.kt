package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.Action
import com.marisarichmond.taskmanager.exceptions.UnauthorizedEntityAccessException
import com.marisarichmond.taskmanager.models.Note
import com.marisarichmond.taskmanager.models.NoteAttachment
import com.marisarichmond.taskmanager.models.NoteTag
import com.marisarichmond.taskmanager.models.dtos.*
import com.marisarichmond.taskmanager.models.toDTO
import org.springframework.stereotype.Service
import java.util.*
import javax.transaction.Transactional

@Service
class NoteManagerService(
    private val attachmentService: AttachmentService,
    private val attachmentTypeService: AttachmentTypeService,
    private val noteService: NoteService,
    private val noteAttachmentService: NoteAttachmentService,
    private val noteTagService: NoteTagService,
    private val sectionService: SectionService,
    private val tagService: TagService,
) {
    // helper functionality
    fun Note.populate(): NoteDTO = this.run {
        NoteDTO(
            id = id,
            title = title,
            text = text,
            sectionId = section.id,
            attachments = noteAttachmentService.getByNoteId(id).map { it.toDTO() },
            tags = noteTagService.getByNoteId(id).map { it.toDTO() },
            createdAt = createdAt,
            updatedAt = updatedAt,
        )
    }

    // get functionality
    fun getNoteDataByUserId(userId: UUID): NoteDataDTO = NoteDataDTO(
        attachmentTypes = attachmentTypeService.get(),
        notes = noteService.getByUserId(userId).map { it.populate() },
        sections = sectionService.getByUserId(userId).map { it.toDTO() },
        tags = tagService.getByUserId(userId),
    )

    fun getNoteById(noteId: UUID, userId: UUID): NoteDTO = noteService.getById(noteId).populate()

    // create functionality
    @Transactional
    fun createNote(createNoteDTO: CreateNoteDTO, userId: UUID): NoteDTO = noteService.create(createNoteDTO, userId).populate()

    @Transactional
    fun createNoteAttachment(createNoteAttachmentDTO: CreateNoteAttachmentDTO): NoteAttachmentDTO =
        createNoteAttachmentDTO.run {
            noteAttachmentService.create(
                createNoteAttachmentDTO.copy(
                    attachment = attachmentService.create(
                        CreateAttachmentDTO(
                            link = link,
                            attachmentTypeId = attachmentTypeId,
                            name = name,
                        )
                    )
                )
            )
        }

    @Transactional
    fun createNoteTag(createNoteTagDTO: CreateNoteTagDTO): NoteTagDTO = createNoteTagDTO.run {
        noteTagService.create(
            id = id,
            note = noteService.getById(noteId),
            tag = tagService.getById(tagId),
        )
    }

    // update functionality
    @Transactional
    fun updateNoteById(noteId: UUID, updateNoteByIdDTO: UpdateNoteByIdDTO, userId: UUID): NoteDTO =
        noteService.updateById(noteId, updateNoteByIdDTO, userId).populate()

    @Transactional
    fun updateNoteAttachmentById(attachmentId: UUID, updateAttachmentDTO: UpdateAttachmentDTO): AttachmentDTO =
        attachmentService.updateById(attachmentId, updateAttachmentDTO)

    // delete functionality
    @Transactional
    @Throws(UnauthorizedEntityAccessException::class)
    fun deleteNoteDataByNoteId(noteId: UUID, userId: UUID) {
        val noteById = noteService.getById(noteId)

        if (noteById.user.id != userId) {
            throw UnauthorizedEntityAccessException(userId, Action.DELETE, noteId, Note::class.simpleName)
        }

        noteTagService.deleteByNoteId(noteId)
        noteAttachmentService.deleteByNoteId(noteId)
        noteService.deleteById(noteId)
    }

    @Transactional
    @Throws(UnauthorizedEntityAccessException::class)
    fun deleteNoteAttachmentById(noteAttachmentId: UUID, userId: UUID) {
        noteAttachmentService.getById(noteAttachmentId).run {
            if (note.user.id != userId) {
                throw UnauthorizedEntityAccessException(
                    userId,
                    Action.DELETE,
                    noteAttachmentId,
                    NoteAttachment::class.simpleName,
                )
            }

            attachmentService.deleteById(attachment.id)
            noteAttachmentService.deleteById(noteAttachmentId)
        }
    }

    @Transactional
    @Throws(UnauthorizedEntityAccessException::class)
    fun deleteNoteTagById(noteTagId: UUID, userId: UUID) {
        noteTagService.getById(noteTagId).run {
            if (note.user.id != userId) {
                throw UnauthorizedEntityAccessException(
                    userId,
                    Action.DELETE,
                    noteTagId,
                    NoteTag::class.simpleName,
                )
            }

            noteTagService.deleteById(noteTagId)
        }
    }
}
