package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.Action
import com.marisarichmond.taskmanager.exceptions.UpstreamEntityOperationException
import com.marisarichmond.taskmanager.models.Note
import com.marisarichmond.taskmanager.models.NoteTag
import com.marisarichmond.taskmanager.models.Tag
import com.marisarichmond.taskmanager.models.dtos.NoteTagDTO
import com.marisarichmond.taskmanager.models.toDTO
import com.marisarichmond.taskmanager.repositories.NoteTagRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class NoteTagService(
    private val noteTagRepository: NoteTagRepository,
) {
    fun getById(id: UUID): NoteTag = noteTagRepository.getById(id)

    fun getByNoteId(noteId: UUID): List<NoteTag> = noteTagRepository.findAllByNoteId(noteId)

    @Throws(UpstreamEntityOperationException::class)
    fun create(id: UUID, note: Note?, tag: Tag?): NoteTagDTO {
        if (note === null) throw UpstreamEntityOperationException(Action.GET, Note::class.simpleName)
        if (tag === null) throw UpstreamEntityOperationException(Action.GET, Tag::class.simpleName)
        return NoteTag(id = id, note = note, tag = tag).let { noteTagRepository.save(it).toDTO() }
    }

    fun deleteById(id: UUID) = noteTagRepository.deleteById(id)

    fun deleteByNoteId(noteId: UUID) = noteTagRepository.deleteAllByNoteId(noteId)

    fun deleteByTagId(tagId: UUID) = noteTagRepository.deleteAllByTagId(tagId)
}
