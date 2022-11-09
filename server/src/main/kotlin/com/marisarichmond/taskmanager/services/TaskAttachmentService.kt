package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.Action
import com.marisarichmond.taskmanager.exceptions.EntityNotFoundException
import com.marisarichmond.taskmanager.exceptions.UpstreamEntityOperationException
import com.marisarichmond.taskmanager.models.Attachment
import com.marisarichmond.taskmanager.models.TaskAttachment
import com.marisarichmond.taskmanager.models.dtos.CreateTaskAttachmentDTO
import com.marisarichmond.taskmanager.models.dtos.TaskAttachmentDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskAttachmentDTO
import com.marisarichmond.taskmanager.models.toDTO
import com.marisarichmond.taskmanager.repositories.TaskAttachmentRepository
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*
import javax.transaction.Transactional

@Service
class TaskAttachmentService(
    private val taskAttachmentRepository: TaskAttachmentRepository,
    private val taskService: TaskService,
) {
    @Transactional
    @Throws(UpstreamEntityOperationException::class)
    fun create(createTaskAttachmentDTO: CreateTaskAttachmentDTO): TaskAttachmentDTO = createTaskAttachmentDTO.run {
        if (attachment === null) throw UpstreamEntityOperationException(Action.GET, Attachment::class.simpleName)

        TaskAttachment(
            id = id,
            task = taskService.getById(taskId),
            attachment = attachment,
        ).let { taskAttachmentRepository.save(it).toDTO() }
    }

    @Throws(EntityNotFoundException::class)
    fun getById(id: UUID): TaskAttachment = taskAttachmentRepository.getById(id)

    fun getByAttachmentId(attachmentId: UUID): TaskAttachment =
        taskAttachmentRepository.findAllByAttachmentId(attachmentId).firstOrNull()
            ?: throw EntityNotFoundException(TaskAttachment::class.simpleName, attachmentId)

    fun getByTaskId(taskId: UUID): List<TaskAttachment> = taskAttachmentRepository.findAllByTaskId(taskId)

    @Transactional
    fun updateById(id: UUID, updateTaskAttachmentDTO: UpdateTaskAttachmentDTO): TaskAttachmentDTO =
        updateTaskAttachmentDTO.run {
            taskAttachmentRepository.getById(id).let { existingTaskAttachment ->
                taskAttachmentRepository.save(
                    existingTaskAttachment.copy(updatedAt = Instant.now().epochSecond)
                ).toDTO()
            }
        }

    @Transactional
    fun deleteById(id: UUID) = taskAttachmentRepository.deleteById(id)

    fun deleteByTaskId(taskId: UUID) = taskAttachmentRepository.deleteAllByTaskId(taskId)
}
