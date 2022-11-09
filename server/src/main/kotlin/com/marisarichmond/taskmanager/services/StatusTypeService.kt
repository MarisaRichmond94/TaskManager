package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.extensions.unwrap
import com.marisarichmond.taskmanager.models.StatusType
import com.marisarichmond.taskmanager.repositories.StatusTypeRepository
import mu.KotlinLogging
import org.springframework.stereotype.Service
import java.util.*

@Service
class StatusTypeService(private val statusTypeRepository: StatusTypeRepository) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    fun getById(id: UUID): StatusType? = statusTypeRepository.findById(id).unwrap()

    fun getByName(name: String): StatusType? = statusTypeRepository.findByNameIgnoreCase(name)

    fun get(): List<StatusType> = statusTypeRepository.findAll()
}
