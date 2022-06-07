package com.marisarichmond.taskmanager.repositories

import com.marisarichmond.taskmanager.models.Tag
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.*
import javax.transaction.Transactional

@Repository
interface TagRepository : JpaRepository<Tag, UUID> {
    fun findAllByUserId(userId: UUID): List<Tag>

    @Transactional
    @Modifying
    @Query("update Tag t set t.name = ?2 where t.id = ?1")
    fun updateTagName(id: UUID, name: String)
}