package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.constants.ExceptionConstants
import com.marisarichmond.taskmanager.constants.ExceptionConstants.Companion.TASK_ATTACHMENT
import com.marisarichmond.taskmanager.exceptions.EntityNotFoundException
import com.marisarichmond.taskmanager.models.TaskAttachment
import com.marisarichmond.taskmanager.models.dtos.CreateTaskAttachmentDTO
import com.marisarichmond.taskmanager.models.dtos.TaskAttachmentDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskAttachmentDTO
import com.marisarichmond.taskmanager.models.toDTO
import com.marisarichmond.taskmanager.repositories.TaskAttachmentRepository
import mu.KotlinLogging
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*
import javax.transaction.Transactional

@Service
class TaskAttachmentService(
    private val taskAttachmentRepository: TaskAttachmentRepository,
    private val taskService: TaskService,
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    @Transactional
    fun create(createTaskAttachmentDTO: CreateTaskAttachmentDTO): TaskAttachmentDTO? = try {
        createTaskAttachmentDTO.run {
            if (attachment === null) return@run null

            TaskAttachment(
                id = id,
                task = taskService.getById(taskId),
                attachment = attachment,
            ).let { taskAttachmentRepository.save(it).toDTO() }
        }
    } catch (exception: Exception) {
        logger.error(exception) { "Failed to create TaskAttachment: $exception." }
        null
    }

    @Throws(EntityNotFoundException::class)
    fun getById(id: UUID): TaskAttachment = try {
        taskAttachmentRepository.getById(id)
    } catch (exception: javax.persistence.EntityNotFoundException) {
        throw EntityNotFoundException(ExceptionConstants.TASK_ATTACHMENT, id)
    }

    fun getByAttachmentId(attachmentId: UUID): TaskAttachment =
        taskAttachmentRepository.findAllByAttachmentId(attachmentId).firstOrNull()
            ?: throw EntityNotFoundException(TASK_ATTACHMENT, attachmentId)

    fun getByTaskId(taskId: UUID): List<TaskAttachment> = taskAttachmentRepository.findAllByTaskId(taskId)

    @Transactional
    fun updateById(id: UUID, updateTaskAttachmentDTO: UpdateTaskAttachmentDTO): TaskAttachmentDTO? = try {
        updateTaskAttachmentDTO.run {
            taskAttachmentRepository.getById(id).let { existingTaskAttachment ->
                taskAttachmentRepository.save(
                    existingTaskAttachment.copy(updatedAt = Instant.now().epochSecond)
                ).toDTO()
            }
        }
    } catch (exception: Exception) {
        logger.error(exception) { "Failed to update TaskAttachment: $exception." }
        null
    }

    @Transactional
    fun deleteById(id: UUID): Boolean = try {
        taskAttachmentRepository.deleteById(id)
        true
    } catch (exception: Exception) {
        logger.error(exception) { "Failed to delete TaskAttachment: $exception." }
        false
    }

    fun deleteByAttachmentId(attachmentId: UUID) = taskAttachmentRepository.deleteAllByAttachmentId(attachmentId)

    fun deleteByTaskId(taskId: UUID) = taskAttachmentRepository.deleteAllByTaskId(taskId)
}
