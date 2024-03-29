package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.exceptions.EntityNotFoundException
import com.marisarichmond.taskmanager.models.Status
import com.marisarichmond.taskmanager.models.StatusType
import com.marisarichmond.taskmanager.models.Task
import com.marisarichmond.taskmanager.models.dtos.StatusDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskStatusDTO
import com.marisarichmond.taskmanager.models.toDTO
import com.marisarichmond.taskmanager.repositories.StatusRepository
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*
import javax.transaction.Transactional

@Service
class StatusService(
    private val statusRepository: StatusRepository,
    private val statusTypeService: StatusTypeService,
) {
    fun initializeTaskStatus(task: Task, statusType: StatusType) = Status(task = task, statusType = statusType).let(statusRepository::save)

    fun getByTaskId(taskId: UUID): Status? = statusRepository.findByTaskId(taskId)

    @Transactional
    fun updateById(id: UUID, updateTaskStatusDTO: UpdateTaskStatusDTO): StatusDTO = updateTaskStatusDTO.run {
        statusRepository.getById(id).let { existingStatus ->
            statusRepository.save(
                existingStatus.copy(
                    updatedAt = Instant.now().epochSecond,
                    statusType = if (statusTypeId != null && statusTypeId != existingStatus.statusType.id) {
                        statusTypeService.getById(statusTypeId)
                            ?: throw EntityNotFoundException(StatusType::class.simpleName, statusTypeId)
                    } else existingStatus.statusType,
                )
            ).toDTO()
        }
    }

    fun deleteByTaskId(taskId: UUID) = statusRepository.deleteByTaskId(taskId)
}
