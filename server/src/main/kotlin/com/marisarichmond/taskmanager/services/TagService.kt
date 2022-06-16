package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.repositories.TagRepository
import mu.KotlinLogging
import org.springframework.stereotype.Service

@Service
class TagService(
    private val tagRepository: TagRepository,
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }
}