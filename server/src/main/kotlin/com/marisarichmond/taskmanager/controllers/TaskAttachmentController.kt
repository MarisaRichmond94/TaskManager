package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.TaskAttachment
import com.marisarichmond.taskmanager.models.dtos.AttachmentDTO
import com.marisarichmond.taskmanager.models.dtos.CreateAttachmentDTO
import com.marisarichmond.taskmanager.models.dtos.CreateTaskAttachmentDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateAttachmentDTO
import com.marisarichmond.taskmanager.models.toDTO
import com.marisarichmond.taskmanager.services.AttachmentService
import com.marisarichmond.taskmanager.services.TaskAttachmentService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

/**
 * The task attachment controller is designed to simplify task attachment creation by handling both the attachment
 * CRUD operations and the relationship CRUD operations. However, it should always return an attachment because the
 * front-end doesn't care about the relationship between a task and an attachment--just the attachment.
 */
@CrossOrigin(origins = ["*"])
@RestController
@RequestMapping("/api/private/task_attachments")
class TaskAttachmentController(
    private val attachmentService: AttachmentService,
    private val taskAttachmentService: TaskAttachmentService,
) : BaseController(TaskAttachment::class.simpleName) {
    @ResponseBody
    @PostMapping
    fun create(@RequestBody createTaskAttachmentDTO: CreateTaskAttachmentDTO): ResponseEntity<AttachmentDTO> = try {
        createTaskAttachmentDTO.run {
            val attachment = attachmentService.create(
                CreateAttachmentDTO(
                    id = UUID.randomUUID(),
                    link = link,
                    name = name,
                    attachmentTypeId = attachmentTypeId,
                )
            )
            ResponseEntity.status(HttpStatus.CREATED).body(
                taskAttachmentService.create(
                    createTaskAttachmentDTO.copy(attachment = attachment)
                ).attachment.toDTO()
            )
        }
    } catch (exception: Exception) {
        throw baseControllerException(Action.CREATE, exception)
    }

    @ResponseBody
    @PatchMapping("/{attachmentId}")
    fun updateById(
        @PathVariable attachmentId: UUID,
        @RequestBody updateAttachmentDTO: UpdateAttachmentDTO,
    ): ResponseEntity<AttachmentDTO> = try {
        updateAttachmentDTO.run {
            ResponseEntity.status(HttpStatus.ACCEPTED).body(
                attachmentService.updateById(attachmentId, updateAttachmentDTO)
            )
        }
    } catch (exception: Exception) {
        throw baseControllerException(Action.UPDATE, exception)
    }

    @ResponseBody
    @DeleteMapping("/{attachmentId}")
    fun deleteById(@PathVariable attachmentId: UUID): ResponseEntity<String> = try {
        val id = taskAttachmentService.getByAttachmentId(attachmentId).id
        taskAttachmentService.deleteById(id)
        attachmentService.deleteById(attachmentId)
        ResponseEntity.status(HttpStatus.ACCEPTED).body("Task Attachment successfully deleted.")
    } catch (exception: Exception) {
        throw baseControllerException(Action.DELETE, exception)
    }
}
