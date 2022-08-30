package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.dtos.StatusDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskStatusDTO
import com.marisarichmond.taskmanager.services.StatusService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@CrossOrigin
@RestController
@RequestMapping("/api/private/statuses")
class StatusController(private val statusService: StatusService) {
    @ResponseBody
    @PatchMapping("/{id}")
    fun updateById(
        @PathVariable id: UUID,
        @RequestBody updateTaskStatusDTO: UpdateTaskStatusDTO,
    ): ResponseEntity<StatusDTO?> =
        when (val updatedTaskStatus = statusService.updateById(id, updateTaskStatusDTO)) {
            is StatusDTO -> ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedTaskStatus)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }
}
