package com.marisarichmond.taskmanager.repositories

import com.marisarichmond.taskmanager.models.NoteAttachment
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface NoteAttachmentRepository : JpaRepository<NoteAttachment, UUID> {
    fun findAllByNoteId(noteId: UUID): List<NoteAttachment>

    fun deleteAllByNoteId(noteId: UUID)
}
