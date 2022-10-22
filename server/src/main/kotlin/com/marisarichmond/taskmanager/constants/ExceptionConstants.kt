package com.marisarichmond.taskmanager.constants

public class ExceptionConstants {
    companion object {
        // actions
        private const val CREATE = "create"
        const val DELETE = "delete"
        const val UPDATE = "update"

        // types
        const val ATTACHMENT = "Attachment"
        const val ATTACHMENT_TYPE = "Attachment Type"
        const val STATUS_TYPE = "Status Type"
        const val TAG = "Tag"
        const val TASK = "Task"
        const val TASK_ATTACHMENT = "Task Attachment"
        const val USER = "User"

        fun createFailed(exception: Throwable, entityType: String? = "entity"): String = "Failed to $CREATE $entityType: ${exception.message}"
        fun updateFailed(exception: Throwable, entityType: String? = "entity"): String = "Failed to $UPDATE $entityType: ${exception.message}"
        fun deleteFailed(exception: Throwable, entityType: String? = "entity"): String = "Failed to $DELETE $entityType: ${exception.message}"
    }
}
