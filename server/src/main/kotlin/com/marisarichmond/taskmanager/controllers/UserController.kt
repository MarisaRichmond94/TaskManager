package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.User
import com.marisarichmond.taskmanager.models.dtos.CreateUserRequestBody
import com.marisarichmond.taskmanager.services.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@CrossOrigin(origins = ["*"])
@RestController
@RequestMapping("/api/private/users")
class UserController(private val userService: UserService) {
    @ResponseBody
    @PostMapping
    fun findOrCreateUser(@RequestBody createUserRequestBody: CreateUserRequestBody): ResponseEntity<User?> =
        when (val newUser = userService.findOrCreateUser(createUserRequestBody)) {
            is User -> ResponseEntity.status(HttpStatus.CREATED).body(newUser)
            else -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
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
