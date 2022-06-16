package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.repositories.TaskRepository
import mu.KotlinLogging
import org.springframework.stereotype.Service

@Service
class TaskService(
    private val taskRepository: TaskRepository,
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }
}