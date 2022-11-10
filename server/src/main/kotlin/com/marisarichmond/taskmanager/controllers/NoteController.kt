package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.Note
import com.marisarichmond.taskmanager.models.dtos.CreateNoteDTO
import com.marisarichmond.taskmanager.models.dtos.NoteDTO
import com.marisarichmond.taskmanager.models.dtos.UpdateNoteByIdDTO
import com.marisarichmond.taskmanager.services.NoteService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@CrossOrigin(origins = ["*"])
@RestController
@RequestMapping("/api/private/notes")
class NoteController(private val noteService: NoteService) : BaseController(Note::class.simpleName) {
    @ResponseBody
    @PostMapping
    fun create(
        @RequestBody createNoteDTO: CreateNoteDTO,
        @RequestHeader("userId") userId: UUID,
    ): ResponseEntity<NoteDTO> = try {
        ResponseEntity.status(HttpStatus.CREATED).body(
            noteService.create(createNoteDTO, userId)
        )
    } catch (exception: Exception) {
        throw baseControllerException(Action.CREATE, exception)
    }

    @ResponseBody
    @PatchMapping("/{id}")
    fun updateById(
        @PathVariable id: UUID,
        @RequestHeader("userId") userId: UUID,
        @RequestBody updateNoteByIdDTO: UpdateNoteByIdDTO,
    ): ResponseEntity<NoteDTO> = try {
        ResponseEntity.status(HttpStatus.ACCEPTED).body(noteService.updateById(id, updateNoteByIdDTO, userId))
    } catch (exception: Exception) {
        throw baseControllerException(Action.UPDATE, exception)
    }

    @ResponseBody
    @DeleteMapping("/{id}")
    fun deleteById(@PathVariable id: UUID, @RequestHeader("userId") userId: UUID): ResponseEntity<String> = try {
        noteService.deleteById(id, userId)
        ResponseEntity.status(HttpStatus.ACCEPTED).body("${Note::class.simpleName} successfully deleted.")
    } catch (exception: Exception) {
        throw baseControllerException(Action.DELETE, exception)
    }
}
