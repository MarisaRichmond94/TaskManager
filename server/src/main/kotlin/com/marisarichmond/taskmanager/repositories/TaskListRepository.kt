package com.marisarichmond.taskmanager.repositories

import com.marisarichmond.taskmanager.models.TaskList
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface TaskListRepository : JpaRepository<TaskList, UUID> {
    fun findAllByUserId(userId: UUID): List<TaskList>
}
