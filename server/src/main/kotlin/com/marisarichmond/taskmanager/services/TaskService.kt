package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.CreateTaskRequestBody
import com.marisarichmond.taskmanager.controllers.UpdateTaskRequestBody
import com.marisarichmond.taskmanager.exceptions.EntityValidationException
import com.marisarichmond.taskmanager.extensions.unwrap
import com.marisarichmond.taskmanager.models.Task
import com.marisarichmond.taskmanager.repositories.TaskRepository
import mu.KotlinLogging
import org.hibernate.HibernateException
import org.springframework.stereotype.Service
import java.util.*

@Service
class TaskService(
    private val tagService: TagService,
    private val taskRepository: TaskRepository,
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    fun createNewTask(createTaskRequestBody: CreateTaskRequestBody): Task? = try {
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
            orderIndex = -1,
            description = createTaskRequestBody.description,
            tags = tagsByIds,
        )
        taskRepository.save(newTask)
        newTask
    } catch (exception: Exception) {
        when (exception) {
            is EntityValidationException -> logger.error { "Validation failed for Task entity: $this" }
            is HibernateException -> logger.error { "Create failed for Task: $this." }
        }
        null
    }

    fun getTaskById(id: UUID): Task? = try {
        taskRepository.findById(id).unwrap()
    } catch (exception: HibernateException) {
        logger.error { "Get failed for Task with id \"$id\": $this." }
        null
    }

    fun updateTaskById(id: UUID, updateTaskRequestBody: UpdateTaskRequestBody): Task? = try {
        val tagsByIds = updateTaskRequestBody.tagIds?.map {
            tagService.getTagById(it) ?: throw EntityValidationException(
                "Task",
                "tag",
                "$it",
                "Tag with id $it does not exist."
            )
        }?.toSet() ?: setOf()
        taskRepository.findById(id).unwrap()!!.copy(
            objective = updateTaskRequestBody.objective,
            description = updateTaskRequestBody.description,
            tags = tagsByIds,
        )
    } catch (exception: HibernateException) {
        logger.error { "Update failed for Task with id \"$id\": $this." }
        null
    }

    fun deleteTaskById(id: UUID): Boolean = try {
        taskRepository.deleteById(id)
        true
    } catch (exception: HibernateException) {
        logger.error { "Delete failed for Task with id \"$id\": $this." }
        false
    }
}