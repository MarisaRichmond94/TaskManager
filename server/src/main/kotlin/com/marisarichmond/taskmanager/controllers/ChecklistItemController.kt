package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.ChecklistItem
import com.marisarichmond.taskmanager.models.dtos.ChecklistItemDTO
import com.marisarichmond.taskmanager.models.dtos.CreateTaskChecklistItemDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskChecklistItemDTO
import com.marisarichmond.taskmanager.services.ChecklistItemService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@CrossOrigin(origins = ["*"])
@RestController
@RequestMapping("/api/private/checklist_items")
class ChecklistItemController(private val checklistItemService: ChecklistItemService) : BaseController(ChecklistItem::class.simpleName) {
    @ResponseBody
    @PostMapping
    fun create(@RequestBody createTaskChecklistItemDTO: CreateTaskChecklistItemDTO): ResponseEntity<ChecklistItemDTO> = try {
        ResponseEntity.status(HttpStatus.CREATED).body(checklistItemService.create(createTaskChecklistItemDTO))
    } catch (exception: Exception) {
        throw baseControllerException(Action.CREATE, exception)
    }

    @ResponseBody
    @PatchMapping("/{id}")
    fun updateById(
        @PathVariable id: UUID,
        @RequestBody updateTaskChecklistItemDTO: UpdateTaskChecklistItemDTO,
    ): ResponseEntity<ChecklistItemDTO?> = try {
        ResponseEntity.status(HttpStatus.ACCEPTED).body(checklistItemService.updateById(id, updateTaskChecklistItemDTO))
    } catch (exception: Exception) {
        throw baseControllerException(Action.UPDATE, exception)
    }

    @ResponseBody
    @DeleteMapping("/{id}")
    fun deleteById(@PathVariable id: UUID): ResponseEntity<String> = try {
        checklistItemService.deleteById(id)
        ResponseEntity.status(HttpStatus.ACCEPTED).body("${ChecklistItem::class.simpleName} successfully deleted.")
    } catch (exception: Exception) {
        throw baseControllerException(Action.DELETE, exception)
    }
}
