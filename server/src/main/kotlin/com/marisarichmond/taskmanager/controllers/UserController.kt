package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.repositories.UserRepository
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/users")
class UserController(private val repository: UserRepository) {
}