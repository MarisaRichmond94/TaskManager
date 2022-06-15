package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.CreateUserRequestBody
import com.marisarichmond.taskmanager.controllers.UserTaskData
import com.marisarichmond.taskmanager.exceptions.EntityValidationException
import com.marisarichmond.taskmanager.extensions.unwrap
import com.marisarichmond.taskmanager.models.User
import com.marisarichmond.taskmanager.models.validateFields
import com.marisarichmond.taskmanager.repositories.UserRepository
import mu.KotlinLogging
import org.hibernate.HibernateException
import org.springframework.stereotype.Service
import java.util.*
import javax.transaction.Transactional

@Service
class UserService(
    private val attachmentTypeService: AttachmentTypeService,
    private val statusTypeService: StatusTypeService,
    private val tagService: TagService,
    private val taskService: TaskService,
    private val userRepository: UserRepository,
) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    @Throws(HibernateException::class)
    fun getUserById(id: UUID): User? = userRepository.findById(id).unwrap()

    fun getUserByEmail(email: String): User? = try {
        userRepository.findByEmail(email)
    } catch (exception: HibernateException) {
        logger.error(exception) { "Get failed for User with email \"$email\": $exception." }
        null
    }

    fun getUserTaskDataById(id: UUID): UserTaskData? {
        try {
            val user = getUserById(id) ?: return null
            return UserTaskData(
                user,
                attachmentTypeService.getAttachmentTypes(),
                statusTypeService.getStatusTypes(),
                taskService.getTasksByUserId(id),
                tagService.getTagsByUserId(id),
            )
        } catch (exception: HibernateException) {
            logger.error(exception) { "Failed to get task data for User with id \"$id\": $exception." }
            return null
        }
    }

    @Transactional
    fun createNewUser(createUserRequestBody: CreateUserRequestBody): User? = try {
        User(
            firstName = createUserRequestBody.firstName,
            lastName = createUserRequestBody.lastName,
            email = createUserRequestBody.email,
        ).validateFields().let(userRepository::save)
    } catch (exception: Exception) {
        when (exception) {
            is EntityValidationException -> logger.error(exception) { "Validation failed for User entity: $exception." }
            is HibernateException -> logger.error(exception) { "Create failed for User: $exception." }
        }
        null
    }

    @Transactional
    fun deleteUserById(id: UUID): Boolean = try {
        taskService.deleteByUserId(id)
        tagService.deleteByUserId(id)
        userRepository.deleteById(id)
        true
    } catch (exception: HibernateException) {
        logger.error(exception) { "Delete failed for User with id \"$id\": $exception." }
        false
    }
}
