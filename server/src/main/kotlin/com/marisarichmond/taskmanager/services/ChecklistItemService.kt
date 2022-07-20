package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.models.ChecklistItem
import com.marisarichmond.taskmanager.models.dtos.ChecklistItemDTO
import com.marisarichmond.taskmanager.models.dtos.CreateTaskChecklistItemDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTaskChecklistItemDTO
import com.marisarichmond.taskmanager.models.toDTO
import com.marisarichmond.taskmanager.repositories.ChecklistItemRepository
import mu.KotlinLogging
import org.hibernate.HibernateException
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*
import javax.transaction.Transactional

@Service
class ChecklistItemService(
    private val checklistItemRepository: ChecklistItemRepository,
    private val taskService: TaskService,
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    @Transactional
    fun create(createTaskChecklistItemDTO: CreateTaskChecklistItemDTO): ChecklistItemDTO? = try {
        createTaskChecklistItemDTO.run {
            ChecklistItem(
                id = id,
                description = description,
                orderIndex = checklistItemRepository.findAllByTaskId(taskId).size,
                task = taskService.getById(taskId),
            ).let { checklistItemRepository.save(it).toDTO() }
        }
    } catch (exception: Exception) {
        logger.error(exception) { "Failed to create ChecklistItem: $exception." }
        null
    }

    fun getByTaskId(taskId: UUID): List<ChecklistItem> = checklistItemRepository.findAllByTaskId(taskId)

    @Transactional
    fun updateById(id: UUID, updateTaskChecklistItemDTO: UpdateTaskChecklistItemDTO): ChecklistItemDTO? = try {
        updateTaskChecklistItemDTO.run {
            checklistItemRepository.getById(id).let { existingChecklistItem ->
                checklistItemRepository.save(
                    existingChecklistItem.copy(
                        description = description ?: existingChecklistItem.description,
                        isCompleted = isCompleted ?: existingChecklistItem.isCompleted,
                        orderIndex = if (orderIndex != null && orderIndex != existingChecklistItem.orderIndex) {
                            updateOrderIndex(existingChecklistItem, orderIndex)
                            orderIndex
                        } else existingChecklistItem.orderIndex,
                        updatedAt = Instant.now().epochSecond,
                    )
                ).toDTO()
            }
        }
    } catch (exception: Exception) {
        logger.error(exception) { "Failed to update ChecklistItem: $exception." }
        null
    }

    @Transactional
    fun deleteById(id: UUID): Boolean = try {
        val checklistItemToDelete = checklistItemRepository.getById(id)
        checklistItemRepository.findAllByTaskId(checklistItemToDelete.task.id)
            .filter { it.orderIndex > checklistItemToDelete.orderIndex }
            .forEach(::decrementOrderIndex)
        checklistItemRepository.deleteById(id)
        true
    } catch (exception: Exception) {
        logger.error(exception) { "Failed to delete ChecklistItem: $exception." }
        false
    }

    @Throws(HibernateException::class)
    fun deleteByTaskId(taskId: UUID) = checklistItemRepository.deleteAllByTaskId(taskId)

    // Helper functions
    fun decrementOrderIndex(checklistItem: ChecklistItem) = checklistItem.run { checklistItemRepository.save(this.copy(orderIndex = orderIndex - 1)) }

    fun incrementOrderIndex(checklistItem: ChecklistItem) = checklistItem.run { checklistItemRepository.save(this.copy(orderIndex = orderIndex + 1)) }

    fun updateOrderIndex(existingChecklistItem: ChecklistItem, newOrderIndex: Int) {
        if (existingChecklistItem.orderIndex < newOrderIndex) {
            checklistItemRepository.findAllByTaskId(existingChecklistItem.task.id)
                .filter { it.orderIndex <= newOrderIndex && it.orderIndex > existingChecklistItem.orderIndex && it.id != existingChecklistItem.id }
                .forEach(::decrementOrderIndex)
        } else {
            checklistItemRepository.findAllByTaskId(existingChecklistItem.task.id)
                .filter { it.orderIndex >= newOrderIndex && it.orderIndex < existingChecklistItem.orderIndex && it.id != existingChecklistItem.id }
                .forEach(::incrementOrderIndex)
        }
    }
}
