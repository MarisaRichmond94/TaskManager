package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.constants.ExceptionConstants
import com.marisarichmond.taskmanager.exceptions.*
import mu.KotlinLogging
import org.hibernate.HibernateException
import org.springframework.http.HttpStatus

enum class Action {
    CREATE,
    DELETE,
    GET,
    UPDATE,
}

open class BaseController(private val entityType: String? = null) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    protected fun baseControllerException(action: Action, exception: Throwable, entityTypeOverride: String? = null): Throwable {
        val message = when {
            action === Action.CREATE -> ExceptionConstants.createFailed(exception, entityType ?: entityTypeOverride)
            action === Action.GET -> ExceptionConstants.getByIdFailed(exception, entityType ?: entityTypeOverride)
            action === Action.UPDATE -> ExceptionConstants.updateFailed(exception, entityType ?: entityTypeOverride)
            action === Action.DELETE -> ExceptionConstants.deleteFailed(exception, entityType ?: entityTypeOverride)
            else -> throw Exception("service handler received unexpected action \"$action\"")
        }.let { customMessage -> "$customMessage: ${exception.message}" }

        logger.error(exception) { message }

        return ApiError(status = determineStatusCode(exception), message = message)
    }

    private fun determineStatusCode(exception: Throwable): HttpStatus =
        when (exception) {
            is EntityNotFoundException -> HttpStatus.NOT_FOUND
            is EntityValidationException -> HttpStatus.BAD_REQUEST
            is UnauthorizedEntityAccessException -> HttpStatus.UNAUTHORIZED
            is UpstreamEntityOperationException -> HttpStatus.PRECONDITION_FAILED
            is HibernateException -> HttpStatus.NOT_MODIFIED
            else -> HttpStatus.INTERNAL_SERVER_ERROR
        }
}
