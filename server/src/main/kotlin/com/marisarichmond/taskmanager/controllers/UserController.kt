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
class UserController(private val userService: UserService) : BaseController(User::class.simpleName) {
    @ResponseBody
    @PostMapping
    fun findOrCreateUser(
        @RequestBody createUserRequestBody: CreateUserRequestBody,
    ): ResponseEntity<User> = try {
        ResponseEntity
            .status(HttpStatus.CREATED)
            .body(userService.findOrCreateUser(createUserRequestBody))
    } catch (exception: Exception) {
        throw baseControllerException(Action.GET, exception)
    }

    @ResponseBody
    @GetMapping("/{id}")
    fun getUserById(
        @PathVariable id: UUID,
    ): ResponseEntity<User> = try {
        ResponseEntity
            .status(HttpStatus.OK)
            .body(userService.getById(id))
    } catch (exception: Exception) {
        throw baseControllerException(Action.GET, exception)
    }

    @ResponseBody
    @DeleteMapping("/{id}")
    fun deleteUserById(
        @PathVariable id: UUID,
    ): ResponseEntity<String> = try {
        userService.deleteUserById(id)
        ResponseEntity
            .status(HttpStatus.ACCEPTED)
            .body("${User::class.simpleName} successfully deleted")
    } catch (exception: Exception) {
        throw baseControllerException(Action.DELETE, exception)
    }
}
