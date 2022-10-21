package com.marisarichmond.taskmanager.repositories

import com.marisarichmond.taskmanager.models.Section
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface SectionRepository : JpaRepository<Section, UUID> {
}
