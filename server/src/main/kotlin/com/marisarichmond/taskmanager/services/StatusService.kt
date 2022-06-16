package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.repositories.StatusRepository
import org.springframework.stereotype.Service

@Service
class StatusService(private val statusRepository: StatusRepository) {
}
