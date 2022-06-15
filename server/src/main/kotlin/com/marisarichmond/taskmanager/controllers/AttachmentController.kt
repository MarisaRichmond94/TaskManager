package com.marisarichmond.taskmanager.controllers

import com.fasterxml.jackson.annotation.JsonProperty
import com.marisarichmond.taskmanager.models.Attachment
import com.marisarichmond.taskmanager.services.AttachmentService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

data class CreateAttachmentRequestBody(
    val link: String,
    @JsonProperty("attachment_type_id") val attachmentTypeId: UUID,
    @JsonProperty("task_id") val taskId: UUID,
    val name: String? = null,
)

data class UpdateAttachmentRequestBody(
    val link: String,
    @JsonProperty("attachment_type_id") val attachmentTypeId: UUID,
    val name: String? = null,
)

@RestController
@RequestMapping("/attachments")
class AttachmentController(private val attachmentService: AttachmentService) {
    @ResponseBody
    @PostMapping
    fun createNewAttachment(
        @RequestBody createAttachmentRequestBody: CreateAttachmentRequestBody
    ): ResponseEntity<Attachment?> =
        when (val newAttachment = attachmentService.createNewAttachment(createAttachmentRequestBody)) {
            is Attachment -> ResponseEntity.status(HttpStatus.CREATED).body(newAttachment)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }

    @ResponseBody
    @PatchMapping("/{id}")
    fun updateAttachmentById(
        @PathVariable id: UUID,
        @RequestBody updateAttachmentRequestBody: UpdateAttachmentRequestBody,
    ): ResponseEntity<Attachment?> =
        when (val updatedAttachmentById = attachmentService.updateAttachmentById(id, updateAttachmentRequestBody)) {
            is Attachment -> ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedAttachmentById)
            else -> ResponseEntity.status(HttpStatus.NOT_MODIFIED).build()
        }

    @ResponseBody
    @DeleteMapping("/{id}")
    fun deleteAttachmentById(@PathVariable id: UUID): ResponseEntity<Boolean> =
        when (attachmentService.deleteAttachmentById(id)) {
            true -> ResponseEntity.status(HttpStatus.ACCEPTED).build()
            else -> ResponseEntity.status(HttpStatus.NOT_MODIFIED).build()
        }
}
