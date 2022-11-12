package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.Action
import com.marisarichmond.taskmanager.exceptions.EntityNotFoundException
import com.marisarichmond.taskmanager.exceptions.UnauthorizedEntityAccessException
import com.marisarichmond.taskmanager.exceptions.UpstreamEntityOperationException
import com.marisarichmond.taskmanager.models.StatusType
import com.marisarichmond.taskmanager.models.Task
import com.marisarichmond.taskmanager.models.dtos.CreateTaskDTO
import com.marisarichmond.taskmanager.models.dtos.TaskDTO
import com.marisarichmond.taskmanager.models.dtos.TaskDataDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskByIdDTO
import com.marisarichmond.taskmanager.models.toDTO
import org.springframework.stereotype.Service
import java.util.*
import javax.transaction.Transactional

@Service
class TaskManagerService(
    private val attachmentTypeService: AttachmentTypeService,
    private val checklistItemService: ChecklistItemService,
    private val commentService: CommentService,
    private val statusService: StatusService,
    private val statusTypeService: StatusTypeService,
    private val tagService: TagService,
    private val taskAttachmentService: TaskAttachmentService,
    private val taskService: TaskService,
    private val taskTagService: TaskTagService,
) {
    companion object {
        const val INITIALIZATION_STATUS_TYPE_NAME = "To Do"
    }

    // helper functions
    @Throws(EntityNotFoundException::class)
    fun Task.populate(): TaskDTO = this.run {
        TaskDTO(
            id = id,
            dueDate = dueDate,
            createdAt = createdAt,
            updatedAt = updatedAt,
            isPinned = isPinned,
            objective = objective,
            description = description,
            status = statusService.getByTaskId(id)?.toDTO()
                ?: throw EntityNotFoundException("Status", id, "task_id"),
            tags = taskTagService.getByTaskId(id).map { it.toDTO() },
            checklistItems = checklistItemService.getByTaskId(id).map { it.toDTO() },
            attachments = taskAttachmentService.getByTaskId(id).map { it.attachment.toDTO() },
            comments = commentService.getByTaskId(id).map { it.toDTO() },
        )
    }

    // create functions
    @Transactional
    @Throws(UpstreamEntityOperationException::class)
    fun create(userId: UUID, createTaskDTO: CreateTaskDTO): TaskDTO =
        taskService.create(userId, createTaskDTO).let {
            val statusType = statusTypeService.getByName(INITIALIZATION_STATUS_TYPE_NAME)
                ?: throw UpstreamEntityOperationException(Action.GET, StatusType::class.simpleName)
            statusService.initializeTaskStatus(it, statusType)
            it.populate()
        }

    // get functions
    @Throws(EntityNotFoundException::class)
    fun getTaskDataByUserId(userId: UUID): TaskDataDTO = TaskDataDTO(
        attachmentTypes = attachmentTypeService.get(),
        statusTypes = statusTypeService.get(),
        tasks = taskService.getByUserId(userId).map { it.populate() },
        tags = tagService.getByUserId(userId),
    )

    @Throws(EntityNotFoundException::class)
    fun getTaskById(userId: UUID, taskId: UUID): TaskDTO = taskService.getById(taskId).populate()

    // update functions
    fun updateTaskById(userId: UUID, taskId: UUID, updateTaskByIdDTO: UpdateTaskByIdDTO): TaskDTO =
        taskService.updateById(userId, taskId, updateTaskByIdDTO).populate()

    // delete functions
    @Transactional
    @Throws(UnauthorizedEntityAccessException::class)
    fun deleteTaskDataByTaskId(taskId: UUID, userId: UUID) {
        val taskById = taskService.getById(taskId)

        if (taskById.user.id != userId) {
            throw UnauthorizedEntityAccessException(userId, Action.DELETE, taskId, Task::class.simpleName)
        }

        taskTagService.deleteByTaskId(taskId)
        checklistItemService.deleteByTaskId(taskId)
        taskAttachmentService.deleteByTaskId(taskId)
        commentService.deleteByTaskId(taskId)
        statusService.deleteByTaskId(taskId)
        taskService.deleteById(taskId)
    }

    @Transactional
    fun deleteTagById(tagId: UUID, userId: UUID) {
        taskTagService.deleteByTagId(tagId)
        tagService.deleteById(tagId)
    }
}
