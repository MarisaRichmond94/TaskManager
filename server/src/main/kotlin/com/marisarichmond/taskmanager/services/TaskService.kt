package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.constants.ExceptionConstants.Companion.TASK
import com.marisarichmond.taskmanager.constants.ExceptionConstants.Companion.UPDATE
import com.marisarichmond.taskmanager.constants.ExceptionConstants.Companion.USER
import com.marisarichmond.taskmanager.exceptions.EntityNotFoundException
import com.marisarichmond.taskmanager.exceptions.UnauthorizedEntityAccessException
import com.marisarichmond.taskmanager.models.Task
import com.marisarichmond.taskmanager.models.dtos.CreateNewTaskDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskByIdDTO
import com.marisarichmond.taskmanager.repositories.TaskRepository
import mu.KotlinLogging
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*
import javax.transaction.Transactional

@Service
class TaskService(
    private val taskRepository: TaskRepository,
    private val userService: UserService,
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    @Transactional
    fun create(userId: UUID, createNewTaskDTO: CreateNewTaskDTO): Task? = try {
        createNewTaskDTO.run {
            Task(
                id = id,
                user = userService.getUserById(userId) ?: throw EntityNotFoundException(USER, userId),
            ).let(taskRepository::save)
        }
    } catch (exception: Exception) {
        logger.error(exception) { "Failed to create Task: $exception." }
        null
    }

    fun getByUserId(userId: UUID): List<Task> = taskRepository.findAllByUserId(userId)

    @Throws(EntityNotFoundException::class)
    fun getById(id: UUID): Task = try {
        taskRepository.getById(id)
    } catch (exception: javax.persistence.EntityNotFoundException) {
        throw EntityNotFoundException(TASK, id)
    }

    @Transactional
    @Throws(EntityNotFoundException::class, UnauthorizedEntityAccessException::class)
    fun updateById(userId: UUID, id: UUID, updateTaskByIdDTO: UpdateTaskByIdDTO): Task? =
        updateTaskByIdDTO.run {
            taskRepository.getById(id).let { existingTask ->
                if (existingTask.user.id != userId) throw UnauthorizedEntityAccessException(userId, UPDATE, id, TASK)
                existingTask.copy(
                    objective = objective ?: existingTask.objective,
                    description = description ?: existingTask.description,
                    dueDate = dueDate ?: existingTask.dueDate,
                    isArchived = isArchived ?: existingTask.isArchived,
                    isPinned = isPinned ?: existingTask.isPinned,
                    updatedAt = Instant.now(),
                ).also { taskRepository.save(it) }
            }
        }

    fun deleteById(id: UUID) = taskRepository.deleteById(id)
}
