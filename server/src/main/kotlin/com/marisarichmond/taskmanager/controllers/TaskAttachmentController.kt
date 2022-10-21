package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.dtos.*
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
) {
    @ResponseBody
    @PostMapping
    fun create(@RequestBody createTaskAttachmentDTO: CreateTaskAttachmentDTO): ResponseEntity<AttachmentDTO?> =
        createTaskAttachmentDTO.run {
            val attachment = attachmentService.create(
                CreateAttachmentDTO(
                    id = UUID.randomUUID(),
                    link = link,
                    name = name,
                    attachmentTypeId = attachmentTypeId,
                )
            )
            println(attachment)

            when (val taskAttachment = taskAttachmentService.create(createTaskAttachmentDTO.copy(attachment = attachment))) {
                is TaskAttachmentDTO -> ResponseEntity.status(HttpStatus.CREATED).body(taskAttachment.attachment.toDTO())
                else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
            }
        }

    @ResponseBody
    @PatchMapping("/{attachmentId}")
    fun updateById(
        @PathVariable attachmentId: UUID,
        @RequestBody updateAttachmentDTO: UpdateAttachmentDTO,
    ): ResponseEntity<AttachmentDTO?> = updateAttachmentDTO.run {
        when (val updatedAttachment = attachmentService.updateById(attachmentId, updateAttachmentDTO)) {
            is AttachmentDTO -> ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedAttachment)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }
    }

    @ResponseBody
    @DeleteMapping("/{attachmentId}")
    fun deleteById(@PathVariable attachmentId: UUID): ResponseEntity<String> = try {
        val id = taskAttachmentService.getByAttachmentId(attachmentId).id
        taskAttachmentService.deleteById(id)
        attachmentService.deleteById(attachmentId)
        ResponseEntity.status(HttpStatus.ACCEPTED).body("Task Attachment successfully deleted.")
    } catch (exception: Exception) {
        ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete Task Attachment with attachmentId \"$attachmentId\".")
    }
}
