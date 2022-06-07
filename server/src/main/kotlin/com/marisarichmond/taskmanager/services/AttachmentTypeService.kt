package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.extensions.unwrap
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

    fun getAttachmentTypeById(id: UUID): AttachmentType? = try {
        attachmentTypeRepository.findById(id).unwrap()
    } catch (exception: HibernateException) {
        logger.error(exception) { "Get failed for AttachmentType with id \"$id\": $exception." }
        null
    }

    fun getAttachmentTypes(): List<AttachmentType> = try {
        attachmentTypeRepository.findAll()
    } catch (exception: HibernateException) {
        logger.error(exception) { "Get failed for AttachmentTypes: $exception." }
        emptyList()
    }
}
