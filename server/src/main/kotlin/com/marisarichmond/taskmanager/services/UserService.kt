package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.controllers.CreateUserRequestBody
import com.marisarichmond.taskmanager.exceptions.EntityValidationException
import com.marisarichmond.taskmanager.extensions.unwrap
import com.marisarichmond.taskmanager.models.User
import com.marisarichmond.taskmanager.models.validateFields
import com.marisarichmond.taskmanager.repositories.UserRepository
import mu.KotlinLogging
import org.hibernate.HibernateException
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserService(private val userRepository: UserRepository) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    fun createNewUser(createUserRequestBody: CreateUserRequestBody): User? = try {
        val newUser = User(
            firstName = createUserRequestBody.firstName,
            lastName = createUserRequestBody.lastName,
            email = createUserRequestBody.email,
        ).validateFields()
        userRepository.save(newUser)
        newUser
    } catch (exception: Exception) {
        when (exception) {
            is EntityValidationException -> logger.error(exception) { "Validation failed for User entity: $exception." }
            is HibernateException -> logger.error(exception) { "Create failed for User: $exception." }
        }
        null
    }

    fun getUserById(id: UUID): User? = try {
        userRepository.findById(id).unwrap()
    } catch (exception: HibernateException) {
        logger.error(exception) { "Get failed for User with id \"$id\": $exception." }
        null
    }

    fun getUserByEmail(email: String): User? = try {
        userRepository.findByEmail(email)
    } catch (exception: HibernateException) {
        logger.error(exception) { "Get failed for User with email \"$email\": $exception." }
        null
    }

    fun deleteUserById(id: UUID): Boolean = try {
        userRepository.deleteById(id)
        true
    } catch (exception: HibernateException) {
        logger.error(exception) { "Delete failed for User with id \"$id\": $exception." }
        false
    }
}
