package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.services.ChecklistItemService
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/checklist_items")
class ChecklistItemController(private val checklistItemService: ChecklistItemService) {
}
