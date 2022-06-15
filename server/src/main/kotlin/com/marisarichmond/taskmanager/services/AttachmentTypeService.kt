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

    @Throws(HibernateException::class)
    fun getAttachmentTypeById(id: UUID): AttachmentType? = attachmentTypeRepository.findById(id).unwrap()

    @Throws(HibernateException::class)
    fun getAttachmentTypes(): List<AttachmentType> = attachmentTypeRepository.findAll()
}
