package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.exceptions.EntityValidationException
import com.marisarichmond.taskmanager.models.Status
import com.marisarichmond.taskmanager.models.Task
import com.marisarichmond.taskmanager.repositories.StatusRepository
import mu.KotlinLogging
import org.hibernate.HibernateException
import org.springframework.stereotype.Service

@Service
class StatusService(
    private val statusRepository: StatusRepository,
    private val statusTypeService: StatusTypeService,
) {
    companion object {
        const val INITIALIZATION_STATUS_TYPE_NAME = "To Do"
        private val logger = KotlinLogging.logger {}
    }

    fun initializeTaskStatus(task: Task) = try {
        val statusType = statusTypeService.getStatusTypeByName(INITIALIZATION_STATUS_TYPE_NAME)
            ?: throw EntityValidationException(
                "Status",
                "StatusType",
                INITIALIZATION_STATUS_TYPE_NAME,
                "Status type with id \"$INITIALIZATION_STATUS_TYPE_NAME\" does not exist.",
            )
        Status(task = task, statusType = statusType).let(statusRepository::save)
    } catch (exception: HibernateException) {
        logger.error(exception) { "Create failed for Status: $exception" }
    }
}
