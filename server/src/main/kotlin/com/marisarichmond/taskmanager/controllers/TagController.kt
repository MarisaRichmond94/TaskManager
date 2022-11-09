package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.Tag
import com.marisarichmond.taskmanager.models.dtos.CreateTagDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTagDTO
import com.marisarichmond.taskmanager.services.TagService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@CrossOrigin(origins = ["*"])
@RestController
@RequestMapping("/api/private/tags")
class TagController(private val tagService: TagService) : BaseController(Tag::class.simpleName) {
    @ResponseBody
    @PostMapping
    fun create(
        @RequestHeader("userId") userId: UUID,
        @RequestBody createTagDTO: CreateTagDTO,
    ): ResponseEntity<Tag> = try {
        ResponseEntity.status(HttpStatus.CREATED).body(tagService.create(userId, createTagDTO))
    } catch (exception: Exception) {
        throw baseControllerException(Action.CREATE, exception)
    }

    @ResponseBody
    @PatchMapping("/{id}")
    fun updateById(
        @PathVariable id: UUID,
        @RequestBody updateTagDTO: UpdateTagDTO,
    ): ResponseEntity<Tag> = try {
        ResponseEntity.status(HttpStatus.ACCEPTED).body(tagService.updateById(id, updateTagDTO))
    } catch (exception: Exception) {
        throw baseControllerException(Action.CREATE, exception)
    }
}
