package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.models.TaskTag
import com.marisarichmond.taskmanager.models.dtos.CreateTaskTagDTO
import com.marisarichmond.taskmanager.models.dtos.TaskTagDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskTagDTO
import com.marisarichmond.taskmanager.models.toDTO
import com.marisarichmond.taskmanager.repositories.TaskTagRepository
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*
import javax.transaction.Transactional

@Service
class TaskTagService(
    private val taskTagRepository: TaskTagRepository,
    private val tagService: TagService,
    private val taskService: TaskService,
) {
    @Transactional
    fun create(createTaskTagDTO: CreateTaskTagDTO): TaskTagDTO = createTaskTagDTO.run {
        TaskTag(
            id = id,
            task = taskService.getById(taskId),
            tag = tagService.getById(tagId),
        ).let { taskTagRepository.save(it).toDTO() }
    }

    fun getByTaskId(taskId: UUID): List<TaskTag> = taskTagRepository.findAllByTaskId(taskId)

    @Transactional
    fun updateById(id: UUID, updateTaskTagDTO: UpdateTaskTagDTO): TaskTagDTO = updateTaskTagDTO.run {
        taskTagRepository.getById(id).let { existingTaskTag ->
            taskTagRepository.save(
                existingTaskTag.copy(
                    updatedAt = Instant.now().epochSecond,
                    tag = if (tagId != null && tagId != existingTaskTag.tag.id) {
                        tagService.getById(tagId)
                    } else existingTaskTag.tag,
                )
            ).toDTO()
        }
    }

    @Transactional
    fun deleteById(id: UUID) = taskTagRepository.deleteById(id)

    fun deleteByTagId(tagId: UUID) = taskTagRepository.deleteAllByTagId(tagId)

    fun deleteByTaskId(taskId: UUID) = taskTagRepository.deleteAllByTaskId(taskId)
}
