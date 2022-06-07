package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.CreateTaskRequestBody
import com.marisarichmond.taskmanager.controllers.UpdateTaskRequestBody
import com.marisarichmond.taskmanager.exceptions.EntityValidationException
import com.marisarichmond.taskmanager.extensions.unwrap
import com.marisarichmond.taskmanager.models.Task
import com.marisarichmond.taskmanager.repositories.TaskRepository
import com.marisarichmond.taskmanager.repositories.TaskTagRepository
import mu.KotlinLogging
import org.hibernate.HibernateException
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*
import javax.transaction.Transactional

@Service
class TaskService(
    private val tagService: TagService,
    private val taskRepository: TaskRepository,
    private val taskTagRepository: TaskTagRepository,
    private val userService: UserService,
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    fun createNewTask(createTaskRequestBody: CreateTaskRequestBody): Task? = try {
        // Get associated user by id
        val userById = userService.getUserById(createTaskRequestBody.userId) ?: throw EntityValidationException(
            "Task",
            "User",
            "${createTaskRequestBody.userId}",
            "User with id \"${createTaskRequestBody.userId}\" does not exist."
        )
        // Get associated tags by ids
        val tagsByIds = createTaskRequestBody.tagIds?.map {
            tagService.getTagById(it) ?: throw EntityValidationException(
                "Task",
                "tag",
                "$it",
                "Tag with id $it does not exist."
            )
        }?.toSet() ?: setOf()

        val newTask = Task(
            objective = createTaskRequestBody.objective,
            description = createTaskRequestBody.description,
            isPinned = createTaskRequestBody.isPinned ?: false,
            dueDate = Instant.ofEpochMilli(createTaskRequestBody.dueDate),
            tags = tagsByIds,
            user = userById,
        )
        taskRepository.save(newTask)
        newTask
    } catch (exception: Exception) {
        when (exception) {
            is EntityValidationException -> logger.error(exception) { "Validation failed for Task entity: $exception." }
            is HibernateException -> logger.error(exception) { "Create failed for Task: $exception." }
        }
        null
    }

    fun getTaskById(id: UUID): Task? = try {
        taskRepository.findById(id).unwrap()
    } catch (exception: HibernateException) {
        logger.error(exception) { "Get failed for Task with id \"$id\": $exception." }
        null
    }

    fun getTasksByUserId(userId: UUID): List<Task> = try {
        taskRepository.findAllByUserId(userId)
    } catch (exception: HibernateException) {
        logger.error(exception) { "Get failed for Task with user id \"$userId\": $exception." }
        emptyList()
    }

    @Transactional
    fun updateTaskById(id: UUID, updateTaskRequestBody: UpdateTaskRequestBody): Task? = try {
        val tagsByIds = updateTaskRequestBody.tagIds?.map {
            tagService.getTagById(it) ?: throw EntityValidationException(
                "Task",
                "tag",
                "$it",
                "Tag with id $it does not exist."
            )
        }?.toSet() ?: setOf()

        val existingTask = taskRepository.findById(id).unwrap()

        taskRepository.updateObjective(id, updateTaskRequestBody.objective)
        taskRepository.updateDescription(id, updateTaskRequestBody.description)
        if (updateTaskRequestBody.isPinned != null) taskRepository.updateIsPinned(id, updateTaskRequestBody.isPinned)
        if (updateTaskRequestBody.dueDate != null) {
            taskRepository.updateDueDate(id, Instant.ofEpochMilli(updateTaskRequestBody.dueDate))
        }
        // TODO - figure out how to modify tags

        existingTask!!.copy(
            objective = updateTaskRequestBody.objective,
            description = updateTaskRequestBody.description,
            isPinned = updateTaskRequestBody.isPinned ?: false,
            dueDate =
            if (updateTaskRequestBody.dueDate != null) Instant.ofEpochMilli(updateTaskRequestBody.dueDate)
            else existingTask.dueDate,
            tags = tagsByIds,
        )
    } catch (exception: HibernateException) {
        logger.error(exception) { "Update failed for Task with id \"$id\": $exception." }
        null
    }

    fun deleteTaskById(id: UUID): Boolean = try {
        taskRepository.deleteById(id)
        true
    } catch (exception: HibernateException) {
        logger.error(exception) { "Delete failed for Task with id \"$id\": $exception." }
        false
    }
}