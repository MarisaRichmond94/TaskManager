package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.extensions.unwrap
import com.marisarichmond.taskmanager.models.StatusType
import com.marisarichmond.taskmanager.repositories.StatusTypeRepository
import mu.KotlinLogging
import org.hibernate.HibernateException
import org.springframework.stereotype.Service
import java.util.*

@Service
class StatusTypeService(private val statusTypeRepository: StatusTypeRepository) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    @Throws(HibernateException::class)
    fun getById(id: UUID): StatusType? = statusTypeRepository.findById(id).unwrap()

    @Throws(HibernateException::class)
    fun getByName(name: String): StatusType? = statusTypeRepository.findByNameIgnoreCase(name)

    @Throws(HibernateException::class)
    fun get(): List<StatusType> = statusTypeRepository.findAll()
}
