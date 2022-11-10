package com.marisarichmond.taskmanager.repositories

import com.marisarichmond.taskmanager.models.TaskTag
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface TaskTagRepository : JpaRepository<TaskTag, UUID> {
    fun findAllByTaskId(taskId: UUID): List<TaskTag>

    fun deleteAllByTaskId(taskId: UUID)

    fun deleteAllByTagId(tagId: UUID)
}
