package com.marisarichmond.taskmanager.repositories

import com.marisarichmond.taskmanager.models.StatusType
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface StatusTypeRepository : JpaRepository<StatusType, UUID>
