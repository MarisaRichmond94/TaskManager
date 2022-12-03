package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.models.dtos.TaskTemplateDTO
import com.marisarichmond.taskmanager.models.toDTO
import com.marisarichmond.taskmanager.repositories.TaskTemplateRepository
import org.springframework.stereotype.Service

@Service
class TaskTemplateService(
    private val taskTemplateRepository: TaskTemplateRepository,
) {
    fun getAll(): List<TaskTemplateDTO> = taskTemplateRepository.findAll().map { it.toDTO() }
}
