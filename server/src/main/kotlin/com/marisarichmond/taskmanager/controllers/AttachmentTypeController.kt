package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.AttachmentType
import com.marisarichmond.taskmanager.services.AttachmentTypeService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/attachment_types")
class AttachmentTypeController(private val attachmentTypeService: AttachmentTypeService) {
    @ResponseBody
    @GetMapping
    fun getAttachmentTypes(): ResponseEntity<List<AttachmentType>> =
        ResponseEntity.status(HttpStatus.FOUND).body(attachmentTypeService.getAttachmentTypes())

    @ResponseBody
    @GetMapping("/{id}")
    fun getAttachmentTypeById(@PathVariable id: UUID): ResponseEntity<AttachmentType?> {
        return when (val attachmentTypeById = attachmentTypeService.getAttachmentTypeById(id)) {
            is AttachmentType -> ResponseEntity.status(HttpStatus.FOUND).body(attachmentTypeById)
            else -> ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
    }
}
