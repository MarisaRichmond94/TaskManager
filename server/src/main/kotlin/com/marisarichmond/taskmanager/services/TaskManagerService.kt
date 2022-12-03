package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.Action
import com.marisarichmond.taskmanager.exceptions.EntityNotFoundException
import com.marisarichmond.taskmanager.exceptions.UnauthorizedEntityAccessException
import com.marisarichmond.taskmanager.exceptions.UpstreamEntityOperationException
import com.marisarichmond.taskmanager.models.*
import com.marisarichmond.taskmanager.models.dtos.*
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
    private val taskAttachmentService: TaskAttachmentService,
    private val taskService: TaskService,
    private val taskTagService: TaskTagService,
    private val taskTemplateService: TaskTemplateService,
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
    fun createTask(userId: UUID, createTaskDTO: CreateTaskDTO) = createTaskDTO.run {
        val task = taskService.create(userId, createTaskDTO).let {
            val statusType = statusTypeService.getByName(INITIALIZATION_STATUS_TYPE_NAME)
                ?: throw UpstreamEntityOperationException(Action.GET, StatusType::class.simpleName)
            statusService.initializeTaskStatus(it, statusType)
            it
        }

        if (taskTemplate !== null) {
            createChecklistItemsByTemplateType(task, taskTemplate)
            if (link !== null) createTaskAttachmentByTemplateType(task, taskTemplate, link)
        }

        task.populate()
    }

    fun createChecklistItemsByTemplateType(task: Task, taskTemplate: TaskTemplate) = taskTemplate.run {
        TemplateType.values().firstOrNull { it.type == type }?.defaultObjectives?.let { descriptions ->
            descriptions.forEach { description ->
                checklistItemService.create(CreateTaskChecklistItemDTO(description = description, taskId = task.id))
            }
        }
    }

    @Throws(UpstreamEntityOperationException::class)
    fun createTaskAttachmentByTemplateType(task: Task, taskTemplate: TaskTemplate, link: String) = taskTemplate.run {
        TemplateType.values().firstOrNull { it.type == type }?.attachmentName?.let {
            attachmentService.create(
                CreateAttachmentDTO(
                    link = link,
                    name = it,
                    attachmentTypeId = attachmentType.id,
                )
            ).let { attachment -> taskAttachmentService.create(UUID.randomUUID(), attachment, task) }
        } ?: throw UpstreamEntityOperationException(Action.CREATE, Attachment::class.simpleName)
    }

    @Transactional
    fun createTaskAttachment(createTaskAttachmentDTO: CreateTaskAttachmentDTO): AttachmentDTO =
        createTaskAttachmentDTO.run {
            taskAttachmentService.create(
                id = id,
                attachment = attachmentService.create(
                    CreateAttachmentDTO(
                        link = link,
                        attachmentTypeId = attachmentTypeId,
                        name = name,
                    )
                ),
                task = taskService.getById(taskId),
            )
        }.attachment.toDTO()

    @Transactional
    fun createTaskTag(createTaskTagDTO: CreateTaskTagDTO): TaskTagDTO = createTaskTagDTO.run {
        taskTagService.create(
            id = id,
            task = taskService.getById(taskId),
            tag = tagService.getById(tagId),
        )
    }

    // get functions
    @Throws(EntityNotFoundException::class)
    fun getTaskDataByUserId(userId: UUID): TaskDataDTO = TaskDataDTO(
        attachmentTypes = attachmentTypeService.get(),
        statusTypes = statusTypeService.get(),
        tasks = taskService.getByUserId(userId).map { it.populate() },
        taskTemplates = taskTemplateService.getAll(),
        tags = tagService.getByUserId(userId),
    )

    @Throws(EntityNotFoundException::class)
    fun getTaskById(userId: UUID, taskId: UUID): TaskDTO = taskService.getById(taskId).populate()

    // update functions
    fun updateTaskById(userId: UUID, taskId: UUID, updateTaskByIdDTO: UpdateTaskByIdDTO): TaskDTO =
        taskService.updateById(userId, taskId, updateTaskByIdDTO).populate()

    @Transactional
    fun updateTaskAttachmentById(attachmentId: UUID, updateAttachmentDTO: UpdateAttachmentDTO): AttachmentDTO =
        attachmentService.updateById(attachmentId, updateAttachmentDTO)

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
    @Throws(UnauthorizedEntityAccessException::class)
    fun deleteTaskAttachmentById(attachmentId: UUID, userId: UUID) {
        taskAttachmentService.getByAttachmentId(attachmentId).run {
            if (task.user.id != userId) {
                throw UnauthorizedEntityAccessException(
                    userId,
                    Action.DELETE,
                    id,
                    TaskAttachment::class.simpleName,
                )
            }

            taskAttachmentService.deleteById(id)
            attachmentService.deleteById(attachmentId)
        }
    }

    @Transactional
    @Throws(UnauthorizedEntityAccessException::class)
    fun deleteTaskTagById(taskTagId: UUID, userId: UUID) {
        taskTagService.getById(taskTagId).run {
            if (task.user.id != userId) {
                throw UnauthorizedEntityAccessException(
                    userId,
                    Action.DELETE,
                    taskTagId,
                    NoteTag::class.simpleName,
                )
            }

            taskTagService.deleteById(taskTagId)
        }
    }
}
