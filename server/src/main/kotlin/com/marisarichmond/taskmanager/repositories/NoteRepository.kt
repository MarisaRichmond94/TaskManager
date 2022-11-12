package com.marisarichmond.taskmanager.repositories

import com.marisarichmond.taskmanager.models.Note
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface NoteRepository : JpaRepository<Note, UUID> {
    fun findAllByUserId(userId: UUID): List<Note>
}
