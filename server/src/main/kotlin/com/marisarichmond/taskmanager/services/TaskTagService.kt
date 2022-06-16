package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.repositories.TaskTagRepository
import mu.KotlinLogging
import org.springframework.stereotype.Service

@Service
class TaskTagService(
    private val taskTagRepository: TaskTagRepository
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }
}
