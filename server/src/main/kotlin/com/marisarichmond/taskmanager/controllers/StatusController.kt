package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.Status
import com.marisarichmond.taskmanager.models.dtos.StatusDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskStatusDTO
import com.marisarichmond.taskmanager.services.StatusService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@CrossOrigin(origins = ["*"])
@RestController
@RequestMapping("/api/private/statuses")
class StatusController(private val statusService: StatusService) : BaseController(Status::class.simpleName) {
    @ResponseBody
    @PatchMapping("/{id}")
    fun updateById(
        @PathVariable id: UUID,
        @RequestBody updateTaskStatusDTO: UpdateTaskStatusDTO,
    ): ResponseEntity<StatusDTO> = try {
        ResponseEntity
            .status(HttpStatus.ACCEPTED)
            .body(statusService.updateById(id, updateTaskStatusDTO))
    } catch (exception: Exception) {
        throw baseControllerException(Action.UPDATE, exception)
    }
}
