package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.services.StatusService
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/statuses")
class StatusController(private val statusService: StatusService) {
}
