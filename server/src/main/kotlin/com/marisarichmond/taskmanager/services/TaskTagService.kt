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

@Service
class TaskTagService(
    private val tagService: TagService,
    private val taskService: TaskService,
    private val taskTagRepository: TaskTagRepository
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    fun createNewTaskTags(createTaskTagsRequestBody: CreateTaskTagsRequestBody): List<TaskTag> = try {
        val newTaskTags = createTaskTagsRequestBody.tagIds.map {
            createNewTaskTag(createTaskTagsRequestBody.taskId, it)
        }
        newTaskTags.forEach { taskTagRepository.save(it) }
        newTaskTags
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
        val taskById = taskService.getTaskById(taskId) ?: throw EntityValidationException(
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

    @Throws(HibernateException::class)
    fun createTaskTag(task: Task, tag: Tag): TaskTag {
        val taskTag = TaskTag(task = task, tag = tag)
        taskTagRepository.save(taskTag)
        return taskTag
    }

    fun getTaskTagsByTaskId(taskId: UUID): List<TaskTag> = try {
        taskTagRepository.findAllByTaskId(taskId)
    } catch (exception: HibernateException) {
        logger.error(exception) { "Failed to get TaskTags by taskId \"$taskId\": $exception" }
        emptyList()
    }

    fun getTaskTagsByTagId(tagId: UUID): List<TaskTag> = try {
        taskTagRepository.findAllByTagId(tagId)
    } catch (exception: HibernateException) {
        logger.error(exception) { "Failed to get TaskTags by tagId \"$tagId\": $exception" }
        emptyList()
    }

    fun deleteTaskTagsByTaskId(taskId: UUID): Boolean = try {
        taskTagRepository.deleteAllByTaskId(taskId)
        true
    } catch (exception: HibernateException) {
        logger.error(exception) { "Delete failed for TaskTags by taskId \"$taskId\": $exception" }
        false
    }

    fun deleteTaskTagsByTagId(tagId: UUID): Boolean = try {
        taskTagRepository.deleteAllByTagId(tagId)
        true
    } catch (exception: HibernateException) {
        logger.error(exception) { "Delete failed for TaskTags by tagId \"$tagId\": $exception" }
        false
    }

    fun deleteTaskTagById(id: UUID): Boolean = try {
        taskTagRepository.deleteById(id)
        true
    } catch (exception: HibernateException) {
        logger.error(exception) { "Delete failed for TaskTag with id \"$id\": $exception." }
        false
    }
}
