package com.marisarichmond.taskmanager.controllers

import com.fasterxml.jackson.annotation.JsonProperty
import com.marisarichmond.taskmanager.models.User
import com.marisarichmond.taskmanager.services.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

data class CreateUserRequestBody(
    val email: String,
    @JsonProperty("first_name") val firstName: String,
    @JsonProperty("last_name") val lastName: String,
)

@RestController
@RequestMapping("/users")
class UserController(private val userService: UserService) {
    @ResponseBody
    @PostMapping
    fun createNewUser(@RequestBody createUserRequestBody: CreateUserRequestBody): ResponseEntity<User?> {
        return when (val newUser = userService.createNewUser(createUserRequestBody)) {
            is User -> ResponseEntity.status(HttpStatus.CREATED).body(newUser)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }
    }

    @ResponseBody
    @GetMapping("/{id}")
    fun getUserById(@PathVariable id: UUID): ResponseEntity<User?> {
        return when (val userById = userService.getUserById(id)) {
            is User -> ResponseEntity.status(HttpStatus.FOUND).body(userById)
            else -> ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
    }

    @ResponseBody
    @GetMapping
    fun getUserByEmail(@RequestParam email: String): ResponseEntity<User?> {
        return when (val userByEmail = userService.getUserByEmail(email)) {
            is User -> ResponseEntity.status(HttpStatus.FOUND).body(userByEmail)
            else -> ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
    }

    @ResponseBody
    @DeleteMapping("/{id}")
    fun deleteUserById(@PathVariable id: UUID): ResponseEntity<Unit> {
        return when (userService.deleteUserById(id)) {
            true -> ResponseEntity.status(HttpStatus.ACCEPTED).build()
            false -> ResponseEntity.status(HttpStatus.NOT_MODIFIED).build()
        }
    }
}
