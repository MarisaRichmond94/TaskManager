package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.CreateNewTaskRequestBody
import com.marisarichmond.taskmanager.exceptions.EntityValidationException
import com.marisarichmond.taskmanager.models.Task
import com.marisarichmond.taskmanager.repositories.TaskRepository
import mu.KotlinLogging
import org.hibernate.HibernateException
import org.springframework.stereotype.Service
import java.util.*

@Service
class TaskService(
    private val taskRepository: TaskRepository,
    private val userService: UserService,
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    fun createNewTask(userId: UUID, createNewTaskRequestBody: CreateNewTaskRequestBody): Task? = try {
        val userById = userService.getUserById(userId)
            ?: throw EntityValidationException("Task", "User", "$userId", "User with id \"$userId\" does not exist.")
        Task(
            id = createNewTaskRequestBody.id,
            objective = createNewTaskRequestBody.objective,
            user = userById,
        ).let(taskRepository::save)
    } catch (exception: HibernateException) {
        logger.error(exception) { "Create failed for Task: $exception" }
        null
    }
}
