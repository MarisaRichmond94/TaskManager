package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.extensions.unwrap
import com.marisarichmond.taskmanager.models.User
import com.marisarichmond.taskmanager.models.dtos.CreateUserRequestBody
import com.marisarichmond.taskmanager.repositories.UserRepository
import org.springframework.stereotype.Service
import java.util.*
import javax.transaction.Transactional

@Service
class UserService(private val userRepository: UserRepository) {
    fun getUserById(id: UUID): User? = userRepository.findById(id).unwrap()

    @Transactional
    fun findOrCreateUser(createUserRequestBody: CreateUserRequestBody): User = createUserRequestBody.run {
        val user = userRepository.findByGoogleId(googleId)?.copy(avatar = avatar) ?: User(
            firstName = firstName,
            lastName = lastName,
            email = email,
            avatar = avatar,
            googleId = googleId,
        )
        userRepository.save(user)
    }

    @Transactional
    fun deleteUserById(id: UUID) = userRepository.deleteById(id)
}
