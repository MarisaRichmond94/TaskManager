package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.dtos.CreateNewSectionDTO
import com.marisarichmond.taskmanager.models.dtos.SectionDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateSectionByIdDTO
import com.marisarichmond.taskmanager.services.SectionService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@CrossOrigin(origins = ["*"])
@RestController
@RequestMapping("/api/private/sections")
class SectionController(private val sectionService: SectionService) {
    @ResponseBody
    @PostMapping
    fun create(
        @RequestHeader("userId") userId: UUID,
        @RequestBody createSectionDTO: CreateNewSectionDTO,
    ): ResponseEntity<SectionDTO?> =
        when (val section = sectionService.create(userId, createSectionDTO)) {
            is SectionDTO -> ResponseEntity.status(HttpStatus.CREATED).body(section)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }

    @ResponseBody
    @PatchMapping("/{id}")
    fun updateById(
        @PathVariable id: UUID,
        @RequestBody updateSectionDTO: UpdateSectionByIdDTO,
    ): ResponseEntity<SectionDTO?> =
        when (val updatedSection = sectionService.updateById(id, updateSectionDTO)) {
            is SectionDTO -> ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedSection)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }
}
