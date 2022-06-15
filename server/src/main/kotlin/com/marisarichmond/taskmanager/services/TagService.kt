package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.CreateTagRequestBody
import com.marisarichmond.taskmanager.controllers.UpdateTagRequestBody
import com.marisarichmond.taskmanager.exceptions.EntityValidationException
import com.marisarichmond.taskmanager.extensions.unwrap
import com.marisarichmond.taskmanager.models.Tag
import com.marisarichmond.taskmanager.models.User
import com.marisarichmond.taskmanager.repositories.TagRepository
import mu.KotlinLogging
import org.hibernate.HibernateException
import org.springframework.stereotype.Service
import java.util.*
import javax.transaction.Transactional

@Service
class TagService(
    private val tagRepository: TagRepository,
    private val taskTagService: TaskTagService,
    private val userService: UserService,
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    // Controller to service functionality
    @Transactional
    fun createNewTag(createTagRequestBody: CreateTagRequestBody): Tag? = try {
        val userById = userService.getUserById(createTagRequestBody.userId)
            ?: throw EntityValidationException(
                "Tag",
                "user",
                "${createTagRequestBody.userId}",
                "User with id ${createTagRequestBody.userId} does not exist."
            )
        Tag(
            name = createTagRequestBody.name,
            user = userById
        ).let(tagRepository::save)
    } catch (exception: Exception) {
        when (exception) {
            is EntityValidationException -> logger.error(exception) { "Validation failed for Tag entity: $exception." }
            is HibernateException -> logger.error(exception) { "Create failed for Tag: $exception." }
        }
        null
    }

    @Transactional
    fun updateTagById(id: UUID, updateTagRequestBody: UpdateTagRequestBody): Tag? = try {
        tagRepository.updateTagName(id, updateTagRequestBody.name)
        tagRepository.findById(id).unwrap()
    } catch (exception: HibernateException) {
        logger.error(exception) { "Update failed for Tag with id \"$id\": $exception." }
        null
    }

    @Transactional
    fun deleteTagById(id: UUID): Boolean = try {
        taskTagService.deleteTaskTagsByTagId(id)
        tagRepository.deleteById(id)
        true
    } catch (exception: HibernateException) {
        logger.error(exception) { "Delete failed for Tag with id \"$id\": $exception." }
        false
    }

    // Service to service functionality
    @Throws(HibernateException::class)
    fun createTags(names: List<String>, user: User): List<Tag> = names.map {
        Tag(name = it, user = user).let(tagRepository::save)
    }

    fun getTagById(id: UUID): Tag? = tagRepository.findById(id).unwrap()

    @Throws(HibernateException::class)
    fun getTagsByUserId(userId: UUID): List<Tag> = tagRepository.findAllByUserId(userId)

    @Throws(HibernateException::class)
    fun deleteByUserId(userId: UUID) {
        tagRepository.findAllByUserId(userId).map { it.id }.forEach(taskTagService::deleteTaskTagsByTagId)
        tagRepository.deleteAllByUserId(userId)
    }
}