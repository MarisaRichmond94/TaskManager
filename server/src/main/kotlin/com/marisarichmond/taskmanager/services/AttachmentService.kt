package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.models.Attachment
import com.marisarichmond.taskmanager.models.dtos.AttachmentDTO
import com.marisarichmond.taskmanager.models.dtos.CreateTaskAttachmentDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskAttachmentDTO
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
    private val taskService: TaskService,
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    @Transactional
    fun create(createTaskAttachmentDTO: CreateTaskAttachmentDTO): AttachmentDTO? = try {
        createTaskAttachmentDTO.run {
            Attachment(
                id = id,
                link = link,
                name = name,
                task = taskService.getById(taskId),
                attachmentType = attachmentTypeService.getById(attachmentTypeId)
            ).let { attachmentRepository.save(it).toDTO() }
        }
    } catch (exception: Exception) {
        logger.error(exception) { "Failed to create Attachment: $exception." }
        null
    }

    fun getByTaskId(taskId: UUID): List<Attachment> = attachmentRepository.findAllByTaskId(taskId)

    @Transactional
    fun updateById(id: UUID, updateTaskAttachmentDTO: UpdateTaskAttachmentDTO): AttachmentDTO? = try {
        updateTaskAttachmentDTO.run {
            attachmentRepository.getById(id).let { existingAttachment ->
                attachmentRepository.save(
                    existingAttachment.copy(
                        link = link ?: existingAttachment.link,
                        name = name ?: existingAttachment.name,
                        updatedAt = Instant.now().epochSecond,
                        task = if (taskId != null && taskId != existingAttachment.task.id) {
                            taskService.getById(taskId)
                        } else existingAttachment.task,
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

    fun deleteByTaskId(taskId: UUID) = attachmentRepository.deleteAllByTaskId(taskId)
}