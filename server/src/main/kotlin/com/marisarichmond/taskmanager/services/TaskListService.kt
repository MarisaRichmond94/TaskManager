package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.CreateTaskListRequestBody
import com.marisarichmond.taskmanager.controllers.UpdateTaskListRequestBody
import com.marisarichmond.taskmanager.exceptions.EntityValidationException
import com.marisarichmond.taskmanager.extensions.unwrap
import com.marisarichmond.taskmanager.models.TaskList
import com.marisarichmond.taskmanager.repositories.TaskListRepository
import mu.KotlinLogging
import org.hibernate.HibernateException
import org.springframework.stereotype.Service
import java.util.*

@Service
class TaskListService(
    private val taskListRepository: TaskListRepository,
    private val userService: UserService,
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    fun createNewTaskList(createTaskListRequestBody: CreateTaskListRequestBody): TaskList? = try {
        val userById = userService.getUserById(createTaskListRequestBody.userId)
            ?: throw EntityValidationException(
                "TaskList",
                "user",
                "${createTaskListRequestBody.userId}",
                "User with id ${createTaskListRequestBody.userId} does not exist."
            )
        val newTaskList = TaskList(
            name = createTaskListRequestBody.name,
            description = createTaskListRequestBody.description,
            user = userById,
        )
        taskListRepository.save(newTaskList)
        newTaskList
    } catch (exception: Exception) {
        when (exception) {
            is EntityValidationException -> logger.error { "Validation failed for TaskList entity: $this" }
            is HibernateException -> logger.error { "Create failed for TaskList: $this." }
        }
        null
    }

    fun getTaskListById(id: UUID): TaskList? = try {
        taskListRepository.findById(id).unwrap()
    } catch (exception: HibernateException) {
        logger.error { "Get failed for TaskList with id \"$id\": $this." }
        null
    }

    fun getTaskListsByUserId(userId: UUID): List<TaskList> = try {
        taskListRepository.findAllByUserId(userId)
    } catch (exception: HibernateException) {
        logger.error { "Get failed for TaskList with user id \"$userId\": $this." }
        emptyList()
    }

    fun updateTaskListById(id: UUID, updateTaskListRequestBody: UpdateTaskListRequestBody): TaskList? = try {
        taskListRepository.findById(id).unwrap()!!.copy(name = updateTaskListRequestBody.name)
    } catch (exception: HibernateException) {
        logger.error { "Update failed for TaskList with id \"$id\": $this." }
        null
    }

    fun deleteTaskListById(id: UUID): Boolean = try {
        taskListRepository.deleteById(id)
        true
    } catch (exception: HibernateException) {
        logger.error { "Delete failed for TaskList with id \"$id\": $this." }
        false
    }
}
