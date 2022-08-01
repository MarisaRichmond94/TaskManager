package com.marisarichmond.taskmanager.models.dtos

// Request DTOs
data class CreateUserRequestBody(
    val email: String,
    val firstName: String,
    val lastName: String,
    val avatar: String,
    val googleId: String,
)
