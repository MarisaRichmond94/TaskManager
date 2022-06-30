package com.marisarichmond.taskmanager.services

import com.marisarichmond.taskmanager.models.Tag
import com.marisarichmond.taskmanager.repositories.TagRepository
import mu.KotlinLogging
import org.springframework.stereotype.Service
import java.util.*

@Service
class TagService(private val tagRepository: TagRepository) {
    companion object {
        private val logger = KotlinLogging.logger {}
    }

    fun getTagsByUserId(userId: UUID): List<Tag> = tagRepository.findAllByUserId(userId)
}