package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.constants.ExceptionConstants.Companion.DELETE
import com.marisarichmond.taskmanager.constants.ExceptionConstants.Companion.TASK
import com.marisarichmond.taskmanager.exceptions.EntityNotFoundException
import com.marisarichmond.taskmanager.exceptions.UnauthorizedEntityAccessException
import com.marisarichmond.taskmanager.models.Task
import com.marisarichmond.taskmanager.models.dtos.CreateNewTaskDTO
import com.marisarichmond.taskmanager.models.dtos.TaskDTO
import com.marisarichmond.taskmanager.models.dtos.TaskDataDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskByIdDTO
import com.marisarichmond.taskmanager.models.toDTO
import mu.KotlinLogging
import org.springframework.stereotype.Service
import java.util.*
import javax.transaction.Transactional

@Service
class TaskManagerService(
    private val attachmentService: AttachmentService,
    private val attachmentTypeService: AttachmentTypeService,
    private val checklistItemService: ChecklistItemService,
    private val commentService: CommentService,
    private val statusService: StatusService,
    private val statusTypeService: StatusTypeService,
    private val tagService: TagService,
    private val taskService: TaskService,
    private val taskTagService: TaskTagService,
) {
    companion object {
        const val INITIALIZATION_STATUS_TYPE_NAME = "To Do"
        private val logger = KotlinLogging.logger {}
    }

    // helper functions
    @Throws(EntityNotFoundException::class)
    fun Task.populate(): TaskDTO = this.run {
        TaskDTO(
            id = id,
            dueDate = dueDate,
            createdAt = createdAt,
            updatedAt = updatedAt,
            isArchived = isArchived,
            isPinned = isPinned,
            objective = objective,
            description = description,
            status = statusService.getByTaskId(id)?.toDTO()
                ?: throw EntityNotFoundException("Status", id, "task_id"),
            tags = taskTagService.getByTaskId(id).map { it.tag },
            checklistItems = checklistItemService.getByTaskId(id).map { it.toDTO() },
            attachments = attachmentService.getByTaskId(id).map { it.toDTO() },
            comments = commentService.getByTaskId(id).map { it.toDTO() },
        )
    }

    // create functions
    fun create(userId: UUID, createNewTaskDTO: CreateNewTaskDTO): TaskDTO? = try {
        taskService.create(userId, createNewTaskDTO)?.let {
            val statusType = statusTypeService.getByName(INITIALIZATION_STATUS_TYPE_NAME)
                ?: throw EntityNotFoundException("StatusType", "name", INITIALIZATION_STATUS_TYPE_NAME)
            statusService.initializeTaskStatus(it, statusType)
            it.populate()
        }
    } catch (exception: Exception) {
        logger.error(exception) { "Create failed for Task: $exception" }
        null
    }

    // get functions
    @Throws(EntityNotFoundException::class)
    fun getTaskDataByUserId(userId: UUID): TaskDataDTO =
        TaskDataDTO(
            attachmentTypes = attachmentTypeService.get(),
            statusTypes = statusTypeService.get(),
            tasks = taskService.getByUserId(userId).map { it.populate() },
            tags = tagService.getByUserId(userId),
        )

    @Throws(EntityNotFoundException::class)
    fun getTaskById(userId: UUID, taskId: UUID): TaskDTO? = try {
        taskService.getById(taskId).populate()
    } catch (exception: Exception) {
        logger.error(exception) { "Get task by id \"$taskId\" failed: $exception." }
        null
    }

    // update functions
    @Throws(EntityNotFoundException::class)
    fun updateTaskById(userId: UUID, taskId: UUID, updateTaskByIdDTO: UpdateTaskByIdDTO): TaskDTO? = try {
        taskService.updateById(userId, taskId, updateTaskByIdDTO)?.populate()
    } catch (exception: Exception) {
        logger.error(exception) { "Update failed: $exception." }
        null
    }

    // delete functions
    @Transactional
    @Throws(EntityNotFoundException::class, UnauthorizedEntityAccessException::class)
    fun deleteTaskDataByTaskId(taskId: UUID, userId: UUID): Boolean = try {
        val taskById = taskService.getById(taskId)
        if (taskById.user.id != userId) {
            throw UnauthorizedEntityAccessException(userId, DELETE, taskId, TASK)
        }

        taskTagService.deleteByTaskId(taskId)
        checklistItemService.deleteByTaskId(taskId)
        attachmentService.deleteByTaskId(taskId)
        commentService.deleteByTaskId(taskId)
        statusService.deleteByTaskId(taskId)
        taskService.deleteById(taskId)
        true
    } catch (exception: Exception) {
        logger.error(exception) { "Delete failed for Task: $exception." }
        false
    }

    @Transactional
    fun deleteTagById(tagId: UUID, userId: UUID): Boolean = try {
        taskTagService.deleteByTagId(tagId)
        tagService.deleteById(tagId)
        true
    } catch (exception: Exception) {
        logger.error(exception) { "Delete failed for Tag: $exception." }
        false
    }
}
