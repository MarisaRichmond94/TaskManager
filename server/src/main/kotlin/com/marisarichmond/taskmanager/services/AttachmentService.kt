package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.exceptions.EntityNotFoundException
import com.marisarichmond.taskmanager.models.Attachment
import com.marisarichmond.taskmanager.models.dtos.AttachmentDTO
import com.marisarichmond.taskmanager.models.dtos.CreateAttachmentDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateAttachmentDTO
import com.marisarichmond.taskmanager.models.toDTO
import com.marisarichmond.taskmanager.repositories.AttachmentRepository
import mu.KotlinLogging
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*
import javax.transaction.Transactional

@Service
class AttachmentService(
    private val attachmentRepository: AttachmentRepository,
    private val attachmentTypeService: AttachmentTypeService,
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    @Transactional
    fun create(createAttachmentDTO: CreateAttachmentDTO): Attachment? = try {
        createAttachmentDTO.run {
            Attachment(
                id = id,
                link = link,
                name = name,
                attachmentType = attachmentTypeService.getById(attachmentTypeId)
            ).let { attachmentRepository.save(it) }
        }
    } catch (exception: Exception) {
        logger.error(exception) { "Failed to create Attachment: $exception." }
        null
    }

    @Throws(EntityNotFoundException::class)
    fun getById(id: UUID): Attachment = try {
        attachmentRepository.getById(id)
    } catch (exception: javax.persistence.EntityNotFoundException) {
        throw EntityNotFoundException(Attachment::class.simpleName, id)
    }

    @Transactional
    fun updateById(id: UUID, updateAttachmentDTO: UpdateAttachmentDTO): AttachmentDTO? = try {
        updateAttachmentDTO.run {
            attachmentRepository.getById(id).let { existingAttachment ->
                attachmentRepository.save(
                    existingAttachment.copy(
                        link = link ?: existingAttachment.link,
                        name = name ?: existingAttachment.name,
                        updatedAt = Instant.now().epochSecond,
                        attachmentType = if (attachmentTypeId != null && attachmentTypeId != existingAttachment.attachmentType.id) {
                            attachmentTypeService.getById(attachmentTypeId)
                        } else existingAttachment.attachmentType,
                    )
                ).toDTO()
            }
        }
    } catch (exception: Exception) {
        logger.error(exception) { "Failed to update Attachment: $exception." }
        null
    }

    @Transactional
    fun deleteById(id: UUID): Boolean = try {
        attachmentRepository.deleteById(id)
        true
    } catch (exception: Exception) {
        logger.error(exception) { "Failed to delete Attachment: $exception." }
        false
    }
}