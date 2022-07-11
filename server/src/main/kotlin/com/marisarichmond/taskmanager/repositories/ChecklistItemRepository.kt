package com.marisarichmond.taskmanager.repositories

import com.marisarichmond.taskmanager.models.ChecklistItem
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface ChecklistItemRepository : JpaRepository<ChecklistItem, UUID> {
    fun findAllByTaskId(taskId: UUID): List<ChecklistItem>

    fun deleteAllByTaskId(taskId: UUID)
}
