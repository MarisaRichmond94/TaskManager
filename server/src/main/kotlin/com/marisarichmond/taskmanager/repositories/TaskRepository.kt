package com.marisarichmond.taskmanager.repositories

import com.marisarichmond.taskmanager.models.Task
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface TaskRepository : JpaRepository<Task, UUID> {
    fun findAllByUserId(userId: UUID): List<Task>

    @Modifying
    @Query("update Task t set t.objective = ?2 where t.id = ?1")
    fun updateObjective(id: UUID, objective: String)

    @Modifying
    @Query("update Task t set t.description = ?2 where t.id = ?1")
    fun updateDescription(id: UUID, description: String?)

    @Modifying
    @Query("update Task t set t.isPinned = ?2 where t.id = ?1")
    fun updateIsPinned(id: UUID, isPinned: Boolean)

    @Modifying
    @Query("update Task t set t.dueDate = ?2 where t.id = ?1")
    fun updateDueDate(id: UUID, dueDate: Long)

    fun deleteAllByUserId(userId: UUID)
}
