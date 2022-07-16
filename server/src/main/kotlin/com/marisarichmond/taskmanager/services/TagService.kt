package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.constants.ExceptionConstants.Companion.TAG
import com.marisarichmond.taskmanager.constants.ExceptionConstants.Companion.USER
import com.marisarichmond.taskmanager.exceptions.EntityNotFoundException
import com.marisarichmond.taskmanager.models.Tag
import com.marisarichmond.taskmanager.models.dtos.CreateTagDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTagDTO
import com.marisarichmond.taskmanager.repositories.TagRepository
import mu.KotlinLogging
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*
import javax.transaction.Transactional

@Service
class TagService(
    private val tagRepository: TagRepository,
    private val userService: UserService,
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    @Transactional
    fun create(userId: UUID, createTagDTO: CreateTagDTO): Tag? = try {
        createTagDTO.run {
            Tag(
                id = id,
                name = name,
                hexColor = hexColor,
                user = userService.getUserById(userId) ?: throw EntityNotFoundException(USER, userId)
            ).let(tagRepository::save)
        }
    } catch (exception: Exception) {
        logger.error(exception) { "Failed to create Tag: $exception." }
        null
    }

    @Throws(EntityNotFoundException::class)
    fun getById(id: UUID): Tag = try {
        tagRepository.getById(id)
    } catch (exception: javax.persistence.EntityNotFoundException) {
        throw EntityNotFoundException(TAG, id)
    }

    @Transactional
    fun updateById(id: UUID, updateTagDTO: UpdateTagDTO): Tag? = try {
        updateTagDTO.run {
            tagRepository.getById(id).let { existingTag ->
                tagRepository.save(
                    existingTag.copy(
                        name = name ?: existingTag.name,
                        hexColor = hexColor ?: existingTag.hexColor,
                        updatedAt = Instant.now(),
                    )
                )
            }
        }
    } catch (exception: Exception) {
        logger.error(exception) { "Failed to update Tag: $exception." }
        null
    }

    @Transactional
    fun deleteById(id: UUID): Boolean = try {
        tagRepository.deleteById(id)
        true
    } catch (exception: Exception) {
        logger.error(exception) { "Failed to delete Tag: $exception." }
        false
    }

    fun getByUserId(userId: UUID): List<Tag> = tagRepository.findAllByUserId(userId)
}