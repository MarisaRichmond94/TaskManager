package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.exceptions.EntityValidationException
import com.marisarichmond.taskmanager.extensions.unwrap
import com.marisarichmond.taskmanager.models.User
import com.marisarichmond.taskmanager.models.dtos.CreateUserRequestBody
import com.marisarichmond.taskmanager.repositories.UserRepository
import mu.KotlinLogging
import org.hibernate.HibernateException
import org.springframework.stereotype.Service
import java.util.*
import javax.transaction.Transactional

@Service
class UserService(private val userRepository: UserRepository) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    @Throws(HibernateException::class)
    fun getUserById(id: UUID): User? = userRepository.findById(id).unwrap()

    @Transactional
    fun findOrCreateUser(createUserRequestBody: CreateUserRequestBody): User? = try {
        createUserRequestBody.run {
            val user = userRepository.findByGoogleId(googleId)?.let {
                it.copy(avatar = avatar)
            } ?: User(
                firstName = firstName,
                lastName = lastName,
                email = email,
                avatar = avatar,
                googleId = googleId,
            )
            userRepository.save(user)
        }
    } catch (exception: Exception) {
        when (exception) {
            is EntityValidationException -> logger.error(exception) { "Validation failed for User entity: $exception." }
            is HibernateException -> logger.error(exception) { "Create failed for User: $exception." }
        }
        null
    }

    @Transactional
    fun deleteUserById(id: UUID): Boolean = try {
        userRepository.deleteById(id)
        true
    } catch (exception: HibernateException) {
        logger.error(exception) { "Delete failed for User with id \"$id\": $exception." }
        false
    }
}
