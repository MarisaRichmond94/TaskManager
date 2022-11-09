package com.marisarichmond.taskmanager.exceptions

import com.fasterxml.jackson.annotation.JsonFormat
import org.springframework.http.HttpStatus
import java.time.LocalDateTime

data class ApiError(
    val status: HttpStatus? = HttpStatus.BAD_REQUEST,
    override val message: String?,
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    val timestamp: LocalDateTime? = LocalDateTime.now()
) : Exception(message)
