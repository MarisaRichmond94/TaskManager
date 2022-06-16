package com.marisarichmond.taskmanager.repositories

import com.marisarichmond.taskmanager.models.Status
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface StatusRepository : JpaRepository<Status, UUID>
