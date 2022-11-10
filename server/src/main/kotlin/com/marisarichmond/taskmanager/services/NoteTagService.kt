package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.Action
import com.marisarichmond.taskmanager.exceptions.UpstreamEntityOperationException
import com.marisarichmond.taskmanager.models.NoteTag
import com.marisarichmond.taskmanager.models.Tag
import com.marisarichmond.taskmanager.models.dtos.CreateNoteTagDTO
import com.marisarichmond.taskmanager.models.dtos.NoteTagDTO
import com.marisarichmond.taskmanager.models.toDTO
import com.marisarichmond.taskmanager.repositories.NoteTagRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class NoteTagService(
    private val noteTagRepository: NoteTagRepository,
    private val noteService: NoteService,
) {
    fun getById(id: UUID): NoteTag = noteTagRepository.getById(id)

    fun getByNoteId(noteId: UUID): List<NoteTag> = noteTagRepository.findAllByNoteId(noteId)

    fun create(createNoteTagDTO: CreateNoteTagDTO): NoteTagDTO = createNoteTagDTO.run {
        if (tag === null) throw UpstreamEntityOperationException(Action.CREATE, Tag::class.simpleName)

        NoteTag(
            id = id,
            note = noteService.getById(noteId),
            tag = tag,
        ).let { noteTagRepository.save(it).toDTO() }
    }

    fun deleteById(id: UUID) = noteTagRepository.deleteById(id)

    fun deleteByNoteId(noteId: UUID) = noteTagRepository.deleteAllByNoteId(noteId)
}
