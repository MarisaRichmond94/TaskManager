package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.constants.ExceptionConstants.Companion.USER
import com.marisarichmond.taskmanager.constants.ExceptionConstants.Companion.createFailed
import com.marisarichmond.taskmanager.constants.ExceptionConstants.Companion.deleteFailed
import com.marisarichmond.taskmanager.constants.ExceptionConstants.Companion.updateFailed
import com.marisarichmond.taskmanager.exceptions.EntityNotFoundException
import com.marisarichmond.taskmanager.models.Section
import com.marisarichmond.taskmanager.models.dtos.CreateNewSectionDTO
import com.marisarichmond.taskmanager.models.dtos.SectionDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateSectionByIdDTO
import com.marisarichmond.taskmanager.models.toDTO
import com.marisarichmond.taskmanager.repositories.SectionRepository
import mu.KotlinLogging
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*
import javax.transaction.Transactional

@Service
class SectionService(
    private val sectionRepository: SectionRepository,
    private val userService: UserService,
) {
    companion object {
        private val logger = KotlinLogging.logger {}
        private val entityType = Section::class.simpleName
    }

    fun getByUserId(userId: UUID): List<Section> = sectionRepository.findAllByUserId(userId)

    @Transactional
    fun create(userId: UUID, createSectionDTO: CreateNewSectionDTO) = try {
        createSectionDTO.run {
            Section(
                id = id,
                title = title,
                user = userService.getUserById(userId) ?: throw EntityNotFoundException(USER, userId),
            ).let { sectionRepository.save(it).toDTO() }
        }
    } catch (exception: Exception) {
        logger.error(exception) { createFailed(exception, entityType) }
        null
    }

    @Transactional
    fun updateById(id: UUID, updateSectionDTO: UpdateSectionByIdDTO): SectionDTO? = try {
        updateSectionDTO.run {
            sectionRepository.getById(id).let { existingSection ->
                sectionRepository.save(
                    existingSection.copy(
                        title = title ?: existingSection.title,
                        updatedAt = Instant.now().epochSecond,
                    )
                ).toDTO()
            }
        }
    } catch (exception: Exception) {
        logger.error(exception) { updateFailed(exception, entityType) }
        null
    }

    @Transactional
    fun deleteById(id: UUID): Boolean = try {
        sectionRepository.deleteById(id)
        true
    } catch (exception: Exception) {
        logger.error(exception) { deleteFailed(exception, entityType) }
        false
    }
}
