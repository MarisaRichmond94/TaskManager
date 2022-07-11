package com.marisarichmond.taskmanager.repositories

import com.marisarichmond.taskmanager.models.Comment
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface CommentRepository : JpaRepository<Comment, UUID> {
    fun findAllByTaskId(taskId: UUID): List<Comment>

    fun deleteAllByTaskId(taskId: UUID)
}
