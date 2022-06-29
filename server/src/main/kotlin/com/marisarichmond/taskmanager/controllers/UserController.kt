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

@CrossOrigin
@RestController
@RequestMapping("/users")
class UserController(private val userService: UserService) {
    @ResponseBody
    @PostMapping
    fun createNewUser(@RequestBody createUserRequestBody: CreateUserRequestBody): ResponseEntity<User?> =
        when (val newUser = userService.createNewUser(createUserRequestBody)) {
            is User -> ResponseEntity.status(HttpStatus.CREATED).body(newUser)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }

    // TODO - Delete this once you've added real authentication
    @ResponseBody
    @GetMapping
    fun getUsers(): ResponseEntity<List<User>> {
        val users = userService.getUsers()
        return when {
            users.isNotEmpty() -> ResponseEntity.status(HttpStatus.OK).body(users)
            else -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(emptyList())
        }
    }

    @ResponseBody
    @GetMapping("/{id}")
    fun getUserById(@PathVariable id: UUID): ResponseEntity<User?> =
        when (val userById = userService.getUserById(id)) {
            is User -> ResponseEntity.status(HttpStatus.OK).body(userById)
            else -> ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }

    @ResponseBody
    @DeleteMapping("/{id}")
    fun deleteUserById(@PathVariable id: UUID): ResponseEntity<Unit> =
        when (userService.deleteUserById(id)) {
            true -> ResponseEntity.status(HttpStatus.ACCEPTED).build()
            false -> ResponseEntity.status(HttpStatus.NOT_MODIFIED).build()
        }
}
