package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.dtos.AttachmentDTO
import com.marisarichmond.taskmanager.models.dtos.CreateTaskAttachmentDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskAttachmentDTO
import com.marisarichmond.taskmanager.services.AttachmentService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@CrossOrigin
@RestController
@RequestMapping("/attachments")
class AttachmentController(private val attachmentService: AttachmentService) {
    @ResponseBody
    @PostMapping
    fun create(@RequestBody createTaskAttachmentDTO: CreateTaskAttachmentDTO): ResponseEntity<AttachmentDTO?> =
        when (val taskAttachment = attachmentService.create(createTaskAttachmentDTO)) {
            is AttachmentDTO -> ResponseEntity.status(HttpStatus.CREATED).body(taskAttachment)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }

    @ResponseBody
    @PatchMapping("/{id}")
    fun updateById(
        @PathVariable id: UUID,
        @RequestBody updateTaskAttachmentDTO: UpdateTaskAttachmentDTO,
    ): ResponseEntity<AttachmentDTO?> =
        when (val updatedTaskAttachment = attachmentService.updateById(id, updateTaskAttachmentDTO)) {
            is AttachmentDTO -> ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedTaskAttachment)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }

    @ResponseBody
    @DeleteMapping("/{id}")
    fun deleteById(@PathVariable id: UUID): ResponseEntity<String> =
        if (attachmentService.deleteById(id)) ResponseEntity.status(HttpStatus.ACCEPTED).body("Attachment successfully deleted.")
        else ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete Attachment with id \"$id\".")
}
