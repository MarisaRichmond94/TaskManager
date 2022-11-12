package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.Action
import com.marisarichmond.taskmanager.exceptions.EntityNotFoundException
import com.marisarichmond.taskmanager.exceptions.UnauthorizedEntityAccessException
import com.marisarichmond.taskmanager.exceptions.UpstreamEntityOperationException
import com.marisarichmond.taskmanager.models.Task
import com.marisarichmond.taskmanager.models.User
import com.marisarichmond.taskmanager.models.dtos.CreateTaskDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskByIdDTO
import com.marisarichmond.taskmanager.repositories.TaskRepository
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*
import javax.transaction.Transactional

@Service
class TaskService(
    private val taskRepository: TaskRepository,
    private val userService: UserService,
) {
    @Transactional
    @Throws(UpstreamEntityOperationException::class)
    fun create(userId: UUID, createTaskDTO: CreateTaskDTO): Task = createTaskDTO.run {
        Task(
            id = id,
            user = userService.getById(userId)
                ?: throw UpstreamEntityOperationException(Action.GET, User::class.simpleName),
        ).let(taskRepository::save)
    }

    fun getByUserId(userId: UUID): List<Task> = taskRepository.findAllByUserId(userId)

    @Throws(EntityNotFoundException::class)
    fun getById(id: UUID): Task = taskRepository.getById(id)

    @Transactional
    @Throws(UnauthorizedEntityAccessException::class)
    fun updateById(userId: UUID, id: UUID, updateTaskByIdDTO: UpdateTaskByIdDTO): Task =
        updateTaskByIdDTO.run {
            taskRepository.getById(id).let { existingTask ->
                if (existingTask.user.id != userId) {
                    throw UnauthorizedEntityAccessException(userId, Action.UPDATE, id, Task::class.simpleName)
                }
                existingTask.copy(
                    objective = objective ?: existingTask.objective,
                    description = description ?: existingTask.description,
                    dueDate = dueDate ?: existingTask.dueDate,
                    isPinned = isPinned ?: existingTask.isPinned,
                    updatedAt = Instant.now().epochSecond,
                ).also { taskRepository.save(it) }
            }
        }

    fun deleteById(id: UUID) = taskRepository.deleteById(id)
}
