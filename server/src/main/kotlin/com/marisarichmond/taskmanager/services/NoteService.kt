package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.Action
import com.marisarichmond.taskmanager.exceptions.EntityNotFoundException
import com.marisarichmond.taskmanager.exceptions.UnauthorizedEntityAccessException
import com.marisarichmond.taskmanager.models.Note
import com.marisarichmond.taskmanager.models.User
import com.marisarichmond.taskmanager.models.dtos.CreateNoteDTO
import com.marisarichmond.taskmanager.models.dtos.NoteDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateNoteByIdDTO
import com.marisarichmond.taskmanager.models.toDTO
import com.marisarichmond.taskmanager.repositories.NoteRepository
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*
import javax.transaction.Transactional

@Service
class NoteService(
    private val noteRepository: NoteRepository,
    private val sectionService: SectionService,
    private val userService: UserService,
) {
    fun getById(id: UUID): Note = noteRepository.getById(id)

    @Transactional
    fun create(createNoteDTO: CreateNoteDTO, userId: UUID): NoteDTO = createNoteDTO.run {
        Note(
            id = id,
            title = title,
            section = sectionService.getById(sectionId),
            user = userService.getById(userId) ?: throw EntityNotFoundException(User::class.simpleName, userId),
        ).let { noteRepository.save(it).toDTO() }
    }

    @Transactional
    @Throws(UnauthorizedEntityAccessException::class)
    fun updateById(
        id: UUID,
        updateNoteByIdDTO: UpdateNoteByIdDTO,
        userId: UUID,
    ): NoteDTO = updateNoteByIdDTO.run {
        noteRepository.getById(id).let { existingNote ->
            if (existingNote.user.id != userId) {
                throw UnauthorizedEntityAccessException(userId, Action.UPDATE, id, Note::class.simpleName)
            }

            noteRepository.save(
                existingNote.copy(
                    title = title ?: existingNote.title,
                    text = text ?: existingNote.text,
                    section = if (sectionId != null && sectionId != existingNote.section.id) {
                        sectionService.getById(sectionId)
                    } else existingNote.section,
                    updatedAt = Instant.now().epochSecond,
                )
            ).toDTO()
        }
    }

    @Transactional
    @Throws(UnauthorizedEntityAccessException::class)
    fun deleteById(id: UUID, userId: UUID) {
        noteRepository.getById(id).let {
            if (it.user.id != userId) {
                throw UnauthorizedEntityAccessException(userId, Action.UPDATE, id, Note::class.simpleName)
            }
            noteRepository.deleteById(id)
        }
    }
}
