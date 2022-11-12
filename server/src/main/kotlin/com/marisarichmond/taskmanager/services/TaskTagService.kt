package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.Action
import com.marisarichmond.taskmanager.exceptions.UpstreamEntityOperationException
import com.marisarichmond.taskmanager.models.Tag
import com.marisarichmond.taskmanager.models.Task
import com.marisarichmond.taskmanager.models.TaskTag
import com.marisarichmond.taskmanager.models.dtos.TaskTagDTO
import com.marisarichmond.taskmanager.models.toDTO
import com.marisarichmond.taskmanager.repositories.TaskTagRepository
import org.springframework.stereotype.Service
import java.util.*
import javax.transaction.Transactional

@Service
class TaskTagService(
    private val taskTagRepository: TaskTagRepository,
) {
    @Throws(UpstreamEntityOperationException::class)
    fun create(id: UUID, task: Task?, tag: Tag?): TaskTagDTO {
        if (task === null) throw UpstreamEntityOperationException(Action.GET, Task::class.simpleName)
        if (tag === null) throw UpstreamEntityOperationException(Action.GET, Tag::class.simpleName)
        return TaskTag(id = id, task = task, tag = tag).let { taskTagRepository.save(it).toDTO() }
    }

    fun getById(id: UUID): TaskTag = taskTagRepository.getById(id)

    fun getByTaskId(taskId: UUID): List<TaskTag> = taskTagRepository.findAllByTaskId(taskId)

    @Transactional
    fun deleteById(id: UUID) = taskTagRepository.deleteById(id)

    fun deleteByTagId(tagId: UUID) = taskTagRepository.deleteAllByTagId(tagId)

    fun deleteByTaskId(taskId: UUID) = taskTagRepository.deleteAllByTaskId(taskId)
}
