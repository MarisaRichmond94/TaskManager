package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.CreateTaskRequestBody
import com.marisarichmond.taskmanager.controllers.UpdateTaskRequestBody
import com.marisarichmond.taskmanager.exceptions.EntityValidationException
import com.marisarichmond.taskmanager.extensions.unwrap
import com.marisarichmond.taskmanager.models.Attachment
import com.marisarichmond.taskmanager.models.Tag
import com.marisarichmond.taskmanager.models.Task
import com.marisarichmond.taskmanager.repositories.TaskRepository
import mu.KotlinLogging
import org.hibernate.HibernateException
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*
import javax.transaction.Transactional

data class PopulatedTask(
    val task: Task,
    val attachments: List<Attachment>,
    val tags: List<Tag>,
)

@Service
class TaskService(
    private val attachmentService: AttachmentService,
    private val tagService: TagService,
    private val taskRepository: TaskRepository,
    private val taskTagService: TaskTagService,
    private val userService: UserService,
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    @Transactional
    fun createNewTask(createTaskRequestBody: CreateTaskRequestBody): Task? = try {
        val userById = userService.getUserById(createTaskRequestBody.userId) ?: throw EntityValidationException(
            "Task",
            "User",
            "${createTaskRequestBody.userId}",
            "User with id \"${createTaskRequestBody.userId}\" does not exist."
        )

        Task(
            objective = createTaskRequestBody.objective,
            description = createTaskRequestBody.description,
            isPinned = createTaskRequestBody.isPinned ?: false,
            dueDate = Instant.ofEpochMilli(createTaskRequestBody.dueDate),
            user = userById,
        ).let(taskRepository::save)
    } catch (exception: Exception) {
        when (exception) {
            is EntityValidationException -> logger.error(exception) { "Validation failed for Task entity: $exception." }
            is HibernateException -> logger.error(exception) { "Create failed for Task: $exception." }
        }
        null
    }

    @Transactional
    fun updateTaskById(id: UUID, updateTaskRequestBody: UpdateTaskRequestBody): Task? = try {
        taskRepository.updateObjective(id, updateTaskRequestBody.objective)
        taskRepository.updateDescription(id, updateTaskRequestBody.description)
        if (updateTaskRequestBody.isPinned != null) taskRepository.updateIsPinned(id, updateTaskRequestBody.isPinned)
        if (updateTaskRequestBody.dueDate != null) {
            taskRepository.updateDueDate(id, Instant.ofEpochMilli(updateTaskRequestBody.dueDate))
        }

        taskRepository.findById(id).unwrap()
    } catch (exception: HibernateException) {
        logger.error(exception) { "Update failed for Task with id \"$id\": $exception." }
        null
    }

    @Transactional
    fun deleteTaskById(id: UUID): Boolean = try {
        taskTagService.deleteTaskTagsByTaskId(id)
        attachmentService.deleteAttachmentsByTaskId(id)
        taskRepository.deleteById(id)
        true
    } catch (exception: HibernateException) {
        logger.error(exception) { "Delete failed for Task with id \"$id\": $exception." }
        false
    }

    @Throws(HibernateException::class)
    fun getTaskById(id: UUID): PopulatedTask? = taskRepository.findById(id).unwrap()?.let(::buildPopulatedTask)

    @Throws(HibernateException::class)
    fun getTasksByUserId(userId: UUID): List<PopulatedTask> =
        taskRepository.findAllByUserId(userId).mapNotNull(::buildPopulatedTask)

    @Throws(HibernateException::class)
    fun deleteByUserId(userId: UUID) {
        taskRepository.findAllByUserId(userId).forEach {
            taskTagService.deleteTaskTagsByTaskId(it.id)
            attachmentService.deleteAttachmentsByTaskId(it.id)
        }
        taskRepository.deleteAllByUserId(userId)
    }

    private fun buildPopulatedTask(task: Task): PopulatedTask = PopulatedTask(
        task = task,
        attachments = attachmentService.getAttachmentsByTaskId(task.id),
        tags = taskTagService.getTaskTagsByTaskId(task.id).mapNotNull { it.tag },
    )
}