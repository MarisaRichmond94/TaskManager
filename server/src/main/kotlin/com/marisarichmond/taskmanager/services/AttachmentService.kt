package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.repositories.AttachmentRepository
import mu.KotlinLogging
import org.springframework.stereotype.Service

@Service
class AttachmentService(
    private val attachmentRepository: AttachmentRepository,
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }
}