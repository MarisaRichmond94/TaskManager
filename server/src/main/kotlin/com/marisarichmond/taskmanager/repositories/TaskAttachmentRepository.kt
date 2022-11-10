package com.marisarichmond.taskmanager.repositories

import com.marisarichmond.taskmanager.models.TaskAttachment
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface TaskAttachmentRepository : JpaRepository<TaskAttachment, UUID> {
    fun findAllByTaskId(taskId: UUID): List<TaskAttachment>

    fun findAllByAttachmentId(attachmentId: UUID): List<TaskAttachment>

    fun deleteAllByTaskId(taskId: UUID)
}
