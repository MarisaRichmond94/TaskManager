package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.CreateTagRequestBody
import com.marisarichmond.taskmanager.controllers.UpdateTagRequestBody
import com.marisarichmond.taskmanager.exceptions.EntityValidationException
import com.marisarichmond.taskmanager.extensions.unwrap
import com.marisarichmond.taskmanager.models.Tag
import com.marisarichmond.taskmanager.repositories.TagRepository
import mu.KotlinLogging
import org.hibernate.HibernateException
import org.springframework.stereotype.Service
import java.util.*

@Service
class TagService(
    private val tagRepository: TagRepository,
    private val userService: UserService,
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    fun createNewTag(createTagRequestBody: CreateTagRequestBody): Tag? = try {
        val userById = userService.getUserById(createTagRequestBody.userId)
            ?: throw EntityValidationException(
                "Tag",
                "user",
                "${createTagRequestBody.userId}",
                "User with id ${createTagRequestBody.userId} does not exist."
            )
        val newTag = Tag(
            name = createTagRequestBody.name,
            user = userById
        )
        tagRepository.save(newTag)
        newTag
    } catch (exception: Exception) {
        when (exception) {
            is EntityValidationException -> logger.error { "Validation failed for Tag entity: $this" }
            is HibernateException -> logger.error { "Create failed for Tag: $this." }
        }
        null
    }

    fun getTagById(id: UUID): Tag? = try {
        tagRepository.findById(id).unwrap()
    } catch (exception: HibernateException) {
        logger.error { "Get failed for Tag with id \"$id\": $this." }
        null
    }

    fun getTagsByUserId(userId: UUID): List<Tag> = try {
        tagRepository.findAllByUserId(userId)
    } catch (exception: HibernateException) {
        logger.error { "Get failed for Tag with user id \"$userId\": $this." }
        emptyList()
    }

    fun updateTagById(id: UUID, updateTagRequestBody: UpdateTagRequestBody): Tag? = try {
        tagRepository.findById(id).unwrap()!!.copy(name = updateTagRequestBody.name)
    } catch (exception: HibernateException) {
        logger.error { "Update failed for Tag with id \"$id\": $this." }
        null
    }

    fun deleteTagById(id: UUID): Boolean = try {
        tagRepository.deleteById(id)
        true
    } catch (exception: HibernateException) {
        logger.error { "Delete failed for Tag with id \"$id\": $this." }
        false
    }
}