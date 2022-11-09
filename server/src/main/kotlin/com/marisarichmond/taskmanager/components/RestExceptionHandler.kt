package com.marisarichmond.taskmanager.components

import com.marisarichmond.taskmanager.exceptions.ApiError
import com.marisarichmond.taskmanager.exceptions.EntityNotFoundException
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler


@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
class RestExceptionHandler : ResponseEntityExceptionHandler() {
    private fun buildResponseEntity(apiError: ApiError): ResponseEntity<Any?> {
        return ResponseEntity(apiError, apiError.status ?: HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(EntityNotFoundException::class)
    protected fun handleEntityNotFoundException(exception: EntityNotFoundException): ResponseEntity<Any?> {
        return buildResponseEntity(ApiError(status = HttpStatus.NOT_FOUND, message = exception.message))
    }
}
