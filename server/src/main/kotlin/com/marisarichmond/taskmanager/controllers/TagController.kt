package com.marisarichmond.taskmanager.controllers

import com.fasterxml.jackson.annotation.JsonProperty
import com.marisarichmond.taskmanager.models.Tag
import com.marisarichmond.taskmanager.services.TagService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

data class CreateTagRequestBody(
    val name: String,
    @JsonProperty("user_id") val userId: UUID,
)

data class UpdateTagRequestBody(val name: String)

@RestController
@RequestMapping("/tags")
class TagController(private val tagService: TagService) {
    @ResponseBody
    @PostMapping
    fun createNewTag(@RequestBody createTagRequestBody: CreateTagRequestBody): ResponseEntity<Tag?> =
        when (val newTag = tagService.createNewTag(createTagRequestBody)) {
            is Tag -> ResponseEntity.status(HttpStatus.CREATED).body(newTag)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }

    @ResponseBody
    @PatchMapping("/{id}")
    fun updateTagById(
        @PathVariable id: UUID,
        @RequestBody updateTagRequestBody: UpdateTagRequestBody,
    ): ResponseEntity<Tag?> =
        when (val updatedTagById = tagService.updateTagById(id, updateTagRequestBody)) {
            is Tag -> ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedTagById)
            else -> ResponseEntity.status(HttpStatus.NOT_MODIFIED).build()
        }

    @ResponseBody
    @DeleteMapping("/{id}")
    fun deleteTagById(@PathVariable id: UUID): ResponseEntity<Unit> =
        when (tagService.deleteTagById(id)) {
            true -> ResponseEntity.status(HttpStatus.ACCEPTED).build()
            false -> ResponseEntity.status(HttpStatus.NOT_MODIFIED).build()
        }
}
