package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.exceptions.EntityNotFoundException
import com.marisarichmond.taskmanager.models.AttachmentType
import com.marisarichmond.taskmanager.repositories.AttachmentTypeRepository
import mu.KotlinLogging
import org.hibernate.HibernateException
import org.springframework.stereotype.Service
import java.util.*

@Service
class AttachmentTypeService(private val attachmentTypeRepository: AttachmentTypeRepository) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    @Throws(HibernateException::class)
    fun getById(id: UUID): AttachmentType = try {
        attachmentTypeRepository.getById(id)
    } catch (exception: javax.persistence.EntityNotFoundException) {
        throw EntityNotFoundException(AttachmentType::class.simpleName, id)
    }

    @Throws(HibernateException::class)
    fun get(): List<AttachmentType> = attachmentTypeRepository.findAll()
}
