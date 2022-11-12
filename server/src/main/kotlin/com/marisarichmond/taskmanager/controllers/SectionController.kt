package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.Section
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
class SectionController(private val sectionService: SectionService) : BaseController(Section::class.simpleName) {
    @ResponseBody
    @PostMapping
    fun create(
        @RequestHeader("userId") userId: UUID,
        @RequestBody createSectionDTO: CreateNewSectionDTO,
    ): ResponseEntity<SectionDTO> = try {
        ResponseEntity
            .status(HttpStatus.CREATED)
            .body(sectionService.create(userId, createSectionDTO))
    } catch (exception: Exception) {
        throw baseControllerException(Action.CREATE, exception)
    }

    @ResponseBody
    @PatchMapping("/{id}")
    fun updateById(
        @PathVariable id: UUID,
        @RequestBody updateSectionDTO: UpdateSectionByIdDTO,
    ): ResponseEntity<SectionDTO> = try {
        ResponseEntity
            .status(HttpStatus.ACCEPTED)
            .body(sectionService.updateById(id, updateSectionDTO))
    } catch (exception: Exception) {
        throw baseControllerException(Action.UPDATE, exception)
    }
}
