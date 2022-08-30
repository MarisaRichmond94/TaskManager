package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.dtos.ChecklistItemDTO
import com.marisarichmond.taskmanager.models.dtos.CreateTaskChecklistItemDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskChecklistItemDTO
import com.marisarichmond.taskmanager.services.ChecklistItemService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@CrossOrigin
@RestController
@RequestMapping("/api/private/checklist_items")
class ChecklistItemController(private val checklistItemService: ChecklistItemService) {
    @ResponseBody
    @PostMapping
    fun create(@RequestBody createTaskChecklistItemDTO: CreateTaskChecklistItemDTO): ResponseEntity<ChecklistItemDTO?> =
        when (val taskChecklistItem = checklistItemService.create(createTaskChecklistItemDTO)) {
            is ChecklistItemDTO -> ResponseEntity.status(HttpStatus.CREATED).body(taskChecklistItem)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }

    @ResponseBody
    @PatchMapping("/{id}")
    fun updateById(
        @PathVariable id: UUID,
        @RequestBody updateTaskChecklistItemDTO: UpdateTaskChecklistItemDTO,
    ): ResponseEntity<ChecklistItemDTO?> =
        when (val updatedTaskChecklistItem = checklistItemService.updateById(id, updateTaskChecklistItemDTO)) {
            is ChecklistItemDTO -> ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedTaskChecklistItem)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }

    @ResponseBody
    @DeleteMapping("/{id}")
    fun deleteById(@PathVariable id: UUID): ResponseEntity<String> =
        if (checklistItemService.deleteById(id)) ResponseEntity.status(HttpStatus.ACCEPTED).body("Attachment successfully deleted.")
        else ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete Attachment with id \"$id\".")
}
