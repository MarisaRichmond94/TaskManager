package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.Tag
import com.marisarichmond.taskmanager.models.dtos.CreateTagDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTagDTO
import com.marisarichmond.taskmanager.services.TagService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@CrossOrigin
@RestController
@RequestMapping("/tags")
class TagController(private val tagService: TagService) {
    @ResponseBody
    @PostMapping
    fun create(@RequestHeader("userId") userId: UUID, @RequestBody createTagDTO: CreateTagDTO): ResponseEntity<Tag?> =
        when (val taskAttachment = tagService.create(userId, createTagDTO)) {
            is Tag -> ResponseEntity.status(HttpStatus.CREATED).body(taskAttachment)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }

    @ResponseBody
    @PatchMapping("/{id}")
    fun updateById(
        @PathVariable id: UUID,
        @RequestBody updateTagDTO: UpdateTagDTO,
    ): ResponseEntity<Tag?> =
        when (val updatedTaskAttachment = tagService.updateById(id, updateTagDTO)) {
            is Tag -> ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedTaskAttachment)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }
}
