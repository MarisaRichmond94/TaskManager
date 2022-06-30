package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.Tag
import com.marisarichmond.taskmanager.models.Task
import com.marisarichmond.taskmanager.services.UserTaskService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

data class UserTaskData(
    val tasks: List<Task> = emptyList(),
    val tags: List<Tag> = emptyList(),
)

@CrossOrigin
@RestController
@RequestMapping("/user_tasks")
class UserTaskController(private val userTaskService: UserTaskService) {
    @ResponseBody
    @GetMapping
    fun getUserTaskData(@RequestHeader("userId") userId: UUID): ResponseEntity<UserTaskData?> =
        userTaskService.getUserTaskData(userId).let { ResponseEntity.status(HttpStatus.OK).body(it) }
}
