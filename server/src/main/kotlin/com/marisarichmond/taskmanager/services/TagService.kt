package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.Action
import com.marisarichmond.taskmanager.exceptions.EntityNotFoundException
import com.marisarichmond.taskmanager.exceptions.UnauthorizedEntityAccessException
import com.marisarichmond.taskmanager.models.Tag
import com.marisarichmond.taskmanager.models.User
import com.marisarichmond.taskmanager.models.dtos.CreateTagDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateTagDTO
import com.marisarichmond.taskmanager.repositories.TagRepository
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*
import javax.transaction.Transactional

@Service
class TagService(
    private val tagRepository: TagRepository,
    private val noteTagService: NoteTagService,
    private val taskTagService: TaskTagService,
    private val userService: UserService,
) {
    @Throws(EntityNotFoundException::class)
    fun getById(id: UUID): Tag = try {
        tagRepository.getById(id)
    } catch (exception: javax.persistence.EntityNotFoundException) {
        throw EntityNotFoundException(Tag::class.simpleName, id)
    }

    fun getByUserId(userId: UUID): List<Tag> = tagRepository.findAllByUserId(userId)

    @Transactional
    fun create(userId: UUID, createTagDTO: CreateTagDTO): Tag = createTagDTO.run {
        Tag(
            id = id,
            name = name,
            hexColor = hexColor,
            user = userService.getById(userId) ?: throw EntityNotFoundException(User::class.simpleName, userId)
        ).let(tagRepository::save)
    }

    @Transactional
    fun updateById(id: UUID, updateTagDTO: UpdateTagDTO): Tag = updateTagDTO.run {
        tagRepository.getById(id).let { existingTag ->
            tagRepository.save(
                existingTag.copy(
                    name = name ?: existingTag.name,
                    hexColor = hexColor ?: existingTag.hexColor,
                    updatedAt = Instant.now().epochSecond,
                )
            )
        }
    }

    @Transactional
    @Throws(UnauthorizedEntityAccessException::class)
    fun delete(id: UUID, userId: UUID) {
        tagRepository.getById(id).run {
            if (user.id != userId) {
                throw UnauthorizedEntityAccessException(
                    userId,
                    Action.DELETE,
                    id,
                    Tag::class.simpleName,
                )
            }

            noteTagService.deleteByTagId(id)
            taskTagService.deleteByTagId(id)
            tagRepository.deleteById(id)
        }
    }

    fun deleteById(id: UUID) = tagRepository.deleteById(id)
}