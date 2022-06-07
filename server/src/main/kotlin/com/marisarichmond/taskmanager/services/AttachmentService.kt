package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.CreateAttachmentRequestBody
import com.marisarichmond.taskmanager.controllers.UpdateAttachmentRequestBody
import com.marisarichmond.taskmanager.exceptions.EntityValidationException
import com.marisarichmond.taskmanager.extensions.unwrap
import com.marisarichmond.taskmanager.models.Attachment
import com.marisarichmond.taskmanager.repositories.AttachmentRepository
import mu.KotlinLogging
import org.hibernate.HibernateException
import org.springframework.stereotype.Service
import java.util.*
import javax.transaction.Transactional

@Service
class AttachmentService(
    private val attachmentRepository: AttachmentRepository,
    private val attachmentTypeService: AttachmentTypeService,
    private val taskService: TaskService,
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    fun createNewAttachment(createAttachmentRequestBody: CreateAttachmentRequestBody): Attachment? = try {
        // Get associated task by id
        val taskById = taskService.getTaskById(createAttachmentRequestBody.taskId) ?: throw EntityValidationException(
            "Attachment",
            "Task",
            "${createAttachmentRequestBody.taskId}",
            "Task with id \"${createAttachmentRequestBody.taskId}\" does not exist.",
        )
        // Get associated attachment type by id
        val attachmentTypeById =
            attachmentTypeService.getAttachmentTypeById(createAttachmentRequestBody.attachmentTypeId)
                ?: throw EntityValidationException(
                    "Attachment",
                    "AttachmentType",
                    "${createAttachmentRequestBody.attachmentTypeId}",
                    "AttachmentType with id \"${createAttachmentRequestBody.attachmentTypeId}\" does not exist.",
                )

        val newAttachment = Attachment(
            link = createAttachmentRequestBody.link,
            name = createAttachmentRequestBody.name,
            task = taskById,
            attachmentType = attachmentTypeById,
        )
        attachmentRepository.save(newAttachment)
        newAttachment
    } catch (exception: Exception) {
        when (exception) {
            is EntityValidationException -> logger.error(exception) { "Validation failed for Attachment entity: $exception." }
            is HibernateException -> logger.error(exception) { "Create failed for Attachment: $exception." }
        }
        null
    }

    fun getAttachmentById(id: UUID): Attachment? = try {
        attachmentRepository.findById(id).unwrap()
    } catch (exception: HibernateException) {
        logger.error(exception) { "Get failed for Attachment with id \"$id\": $exception." }
        null
    }

    fun getAttachmentsByTaskId(taskId: UUID): List<Attachment> = try {
        attachmentRepository.findAllByTaskId(taskId)
    } catch (exception: HibernateException) {
        logger.error(exception) { "Get failed for Attachment with task id \"$taskId\": $exception." }
        emptyList()
    }

    @Transactional
    fun updateAttachmentById(id: UUID, updateAttachmentRequestBody: UpdateAttachmentRequestBody): Attachment? = try {
        // Get associated attachment type by id
        val attachmentTypeById =
            attachmentTypeService.getAttachmentTypeById(updateAttachmentRequestBody.attachmentTypeId)
                ?: throw EntityValidationException(
                    "Attachment",
                    "AttachmentType",
                    "${updateAttachmentRequestBody.attachmentTypeId}",
                    "AttachmentType with id \"${updateAttachmentRequestBody.attachmentTypeId}\" does not exist.",
                )

        attachmentRepository.updateLink(id, updateAttachmentRequestBody.link)
        attachmentRepository.updateName(id, updateAttachmentRequestBody.name)
        attachmentRepository.updateAttachmentType(id, attachmentTypeById)

        attachmentRepository.findById(id).unwrap()!!.copy(
            link = updateAttachmentRequestBody.link,
            name = updateAttachmentRequestBody.name,
            attachmentType = attachmentTypeById,
        )
    } catch (exception: HibernateException) {
        logger.error(exception) { "Update failed for Attachment with id \"$id\": $exception." }
        null
    }

    fun deleteAttachmentById(id: UUID): Boolean = try {
        attachmentRepository.deleteById(id)
        true
    } catch (exception: HibernateException) {
        logger.error(exception) { "Delete failed for Attachment with id \"$id\": $exception." }
        false
    }

    fun deleteAttachmentsByTaskId(taskId: UUID): Boolean = try {
        attachmentRepository.deleteByTaskId(taskId)
        true
    } catch (exception: HibernateException) {
        logger.error(exception) { "Delete failed for Attachments with taskId \"$taskId\": $exception." }
        false
    }
}