package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.repositories.CommentRepository
import mu.KotlinLogging
import org.springframework.stereotype.Service

@Service
class CommentService(private val commentRepository: CommentRepository) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }
}
