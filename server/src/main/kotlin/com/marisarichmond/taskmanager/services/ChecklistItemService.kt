package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.repositories.ChecklistItemRepository
import mu.KotlinLogging
import org.springframework.stereotype.Service

@Service
class ChecklistItemService(private val checklistItemRepository: ChecklistItemRepository) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }
}
