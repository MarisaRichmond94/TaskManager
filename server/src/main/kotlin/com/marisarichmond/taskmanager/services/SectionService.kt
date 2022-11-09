package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.exceptions.EntityNotFoundException
import com.marisarichmond.taskmanager.models.Section
import com.marisarichmond.taskmanager.models.User
import com.marisarichmond.taskmanager.models.dtos.CreateNewSectionDTO
import com.marisarichmond.taskmanager.models.dtos.SectionDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateSectionByIdDTO
import com.marisarichmond.taskmanager.models.toDTO
import com.marisarichmond.taskmanager.repositories.SectionRepository
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*
import javax.transaction.Transactional

@Service
class SectionService(
    private val sectionRepository: SectionRepository,
    private val userService: UserService,
) {
    fun getByUserId(userId: UUID): List<Section> = sectionRepository.findAllByUserId(userId)

    @Transactional
    fun create(userId: UUID, createSectionDTO: CreateNewSectionDTO): SectionDTO = createSectionDTO.run {
        Section(
            id = id,
            title = title,
            user = userService.getUserById(userId) ?: throw EntityNotFoundException(User::class.simpleName, userId),
        ).let { sectionRepository.save(it).toDTO() }
    }

    @Transactional
    fun updateById(id: UUID, updateSectionDTO: UpdateSectionByIdDTO): SectionDTO = updateSectionDTO.run {
        sectionRepository.getById(id).let { existingSection ->
            sectionRepository.save(
                existingSection.copy(
                    title = title ?: existingSection.title,
                    updatedAt = Instant.now().epochSecond,
                )
            ).toDTO()
        }
    }

    fun deleteById(id: UUID) = sectionRepository.deleteById(id)
}
