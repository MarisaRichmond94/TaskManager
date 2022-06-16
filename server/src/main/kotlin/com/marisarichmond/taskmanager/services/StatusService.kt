package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.repositories.StatusRepository
import mu.KotlinLogging
import org.springframework.stereotype.Service

@Service
class StatusService(private val statusRepository: StatusRepository) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }
}
