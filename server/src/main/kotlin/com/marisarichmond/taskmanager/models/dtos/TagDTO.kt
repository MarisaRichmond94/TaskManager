package com.marisarichmond.taskmanager.models.dtos

import java.util.*

// Request DTOs
data class CreateTagDTO(val id: UUID = UUID.randomUUID(), val name: String)

data class UpdateTagDTO(val name: String? = null)
