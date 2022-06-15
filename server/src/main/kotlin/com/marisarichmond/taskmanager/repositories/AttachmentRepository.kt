package com.marisarichmond.taskmanager.repositories

import com.marisarichmond.taskmanager.models.Attachment
import com.marisarichmond.taskmanager.models.AttachmentType
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface AttachmentRepository : JpaRepository<Attachment, UUID> {
    fun findAllByTaskId(taskId: UUID): List<Attachment>

    fun deleteAllByTaskId(taskId: UUID)

    @Modifying
    @Query("update Attachment a set a.link = ?2 where a.id = ?1")
    fun updateLink(id: UUID, link: String)

    @Modifying
    @Query("update Attachment a set a.name = ?2 where a.id = ?1")
    fun updateName(id: UUID, name: String?)

    @Modifying
    @Query("update Attachment a set a.attachmentType = ?2 where a.id = ?1")
    fun updateAttachmentType(id: UUID, attachmentType: AttachmentType)
}
