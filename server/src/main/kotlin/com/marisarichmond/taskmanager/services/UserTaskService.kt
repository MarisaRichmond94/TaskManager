package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.UserTaskData
import mu.KotlinLogging
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserTaskService(
    private val taskService: TaskService,
    private val tagService: TagService,
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    fun getUserTaskData(userId: UUID): UserTaskData {
        return UserTaskData(
            tasks = taskService.getTasksByUserId(userId),
            tags = tagService.getTagsByUserId(userId),
        )
    }
}
