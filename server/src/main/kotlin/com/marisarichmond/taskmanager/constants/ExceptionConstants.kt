package com.marisarichmond.taskmanager.constants

import com.marisarichmond.taskmanager.controllers.Action

public class ExceptionConstants {
    companion object {
        // custom types
        private const val ENTITY = "Entity"
        const val TASK_DATA = "Task Data"

        fun createFailed(exception: Throwable, entityType: String? = ENTITY): String =
            "Failed to ${Action.CREATE.toString().lowercase()} $entityType: ${exception.message}"

        fun getByIdFailed(exception: Throwable, entityType: String? = ENTITY): String =
            "Failed to ${Action.GET.toString().lowercase()} $entityType by id: ${exception.message}"

        fun updateFailed(exception: Throwable, entityType: String? = ENTITY): String =
            "Failed to ${Action.UPDATE.toString().lowercase()} $entityType: ${exception.message}"

        fun deleteFailed(exception: Throwable, entityType: String? = ENTITY): String =
            "Failed to ${Action.DELETE.toString().lowercase()} $entityType: ${exception.message}"
    }
}
