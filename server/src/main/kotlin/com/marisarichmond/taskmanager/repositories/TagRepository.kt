package com.marisarichmond.taskmanager.repositories

import com.marisarichmond.taskmanager.models.Tag
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface TagRepository : JpaRepository<Tag, UUID> {
    fun findAllByUserId(userId: UUID): List<Tag>
}