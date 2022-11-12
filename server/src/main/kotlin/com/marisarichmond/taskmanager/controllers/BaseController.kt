package com.marisarichmond.taskmanager.controllers

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
        private const val ENTITY = "Entity"
    }

    protected fun baseControllerException(action: Action, exception: Throwable, entityTypeOverride: String? = null): Throwable {
        val message = when {
            action === Action.CREATE -> createFailed(exception, entityType ?: entityTypeOverride)
            action === Action.GET -> getByIdFailed(exception, entityType ?: entityTypeOverride)
            action === Action.UPDATE -> updateFailed(exception, entityType ?: entityTypeOverride)
            action === Action.DELETE -> deleteFailed(exception, entityType ?: entityTypeOverride)
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

    private fun createFailed(exception: Throwable, entityType: String? = ENTITY): String =
        "Failed to ${Action.CREATE.toString().lowercase()} $entityType: ${exception.message}"

    private fun getByIdFailed(exception: Throwable, entityType: String? = ENTITY): String =
        "Failed to ${Action.GET.toString().lowercase()} $entityType by id: ${exception.message}"

    private fun updateFailed(exception: Throwable, entityType: String? = ENTITY): String =
        "Failed to ${Action.UPDATE.toString().lowercase()} $entityType: ${exception.message}"

    private fun deleteFailed(exception: Throwable, entityType: String? = ENTITY): String =
        "Failed to ${Action.DELETE.toString().lowercase()} $entityType: ${exception.message}"
}
