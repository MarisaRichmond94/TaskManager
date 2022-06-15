package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.CreateTaskTagsRequestBody
import com.marisarichmond.taskmanager.exceptions.EntityValidationException
import com.marisarichmond.taskmanager.models.Tag
import com.marisarichmond.taskmanager.models.Task
import com.marisarichmond.taskmanager.models.TaskTag
import com.marisarichmond.taskmanager.repositories.TaskTagRepository
import mu.KotlinLogging
import org.hibernate.HibernateException
import org.springframework.stereotype.Service
import java.util.*
import javax.transaction.Transactional

@Service
class TaskTagService(
    private val tagService: TagService,
    private val taskService: TaskService,
    private val taskTagRepository: TaskTagRepository
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    // Controller to service functionality
    fun createNewTaskTags(createTaskTagsRequestBody: CreateTaskTagsRequestBody): List<TaskTag> = try {
        createTaskTagsRequestBody.tagIds.map {
            createNewTaskTag(createTaskTagsRequestBody.taskId, it)
        }
    } catch (exception: Exception) {
        when (exception) {
            is HibernateException -> println("Oh no!")
            is EntityValidationException -> println("Oh no!!!!")
            else -> println("What the hell happened?")
        }
        emptyList()
    }

    @Throws(EntityValidationException::class)
    fun createNewTaskTag(taskId: UUID, tagId: UUID): TaskTag {
        val taskById = taskService.getTaskById(taskId)?.task ?: throw EntityValidationException(
            "TaskTag",
            "Task",
            "$taskId",
            "Task with id \"$taskId\" does not exist.",
        )
        val tagById = tagService.getTagById(tagId) ?: throw EntityValidationException(
            "TaskTag",
            "Tag",
            "$tagId",
            "Tag with id \"$tagId\" does not exist.",
        )
        val taskTag = TaskTag(
            task = taskById,
            tag = tagById,
        )
        taskTagRepository.save(taskTag)
        return taskTag
    }

    fun getTaskTagsByTaskId(taskId: UUID): List<TaskTag> = try {
        taskTagRepository.findAllByTaskId(taskId)
    } catch (exception: HibernateException) {
        logger.error(exception) { "Failed to get TaskTags by taskId \"$taskId\": $exception" }
        emptyList()
    }

    @Transactional
    fun deleteTaskTagById(id: UUID): Boolean = try {
        taskTagRepository.deleteById(id)
        true
    } catch (exception: HibernateException) {
        logger.error(exception) { "Delete failed for TaskTag with id \"$id\": $exception." }
        false
    }

    // Service to service functionality
    fun getTaskTagsByTagId(tagId: UUID): List<TaskTag> = taskTagRepository.findAllByTagId(tagId)

    @Throws(HibernateException::class)
    fun createTaskTags(task: Task, tags: List<Tag>): List<TaskTag> = tags.map { createTaskTag(task, it) }

    @Throws(HibernateException::class)
    fun createTaskTag(task: Task, tag: Tag): TaskTag {
        val taskTag = TaskTag(task = task, tag = tag)
        taskTagRepository.save(taskTag)
        return taskTag
    }

    @Throws(HibernateException::class)
    fun deleteTaskTagsByTaskId(taskId: UUID) = taskTagRepository.deleteAllByTaskId(taskId)

    @Throws(HibernateException::class)
    fun deleteTaskTagsByTagId(tagId: UUID) = taskTagRepository.deleteAllByTagId(tagId)
}
