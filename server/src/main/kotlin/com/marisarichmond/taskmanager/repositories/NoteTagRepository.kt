package com.marisarichmond.taskmanager.repositories

import com.marisarichmond.taskmanager.models.NoteTag
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface NoteTagRepository : JpaRepository<NoteTag, UUID> {
    fun findAllByNoteId(noteId: UUID): List<NoteTag>

    fun deleteAllByNoteId(noteId: UUID)

    fun deleteAllByTagId(tagId: UUID)
}
