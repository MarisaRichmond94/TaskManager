package com.marisarichmond.taskmanager.repositories

import com.marisarichmond.taskmanager.models.Tag
import com.marisarichmond.taskmanager.models.Task
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface TaskTagRepository : JpaRepository<Task, Tag> {
    fun deleteAllById(id: UUID)
}
