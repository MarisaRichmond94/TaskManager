package com.marisarichmond.taskmanager.controllers

import com.marisarichmond.taskmanager.models.Note
import com.marisarichmond.taskmanager.models.NoteAttachment
import com.marisarichmond.taskmanager.models.NoteTag
import com.marisarichmond.taskmanager.models.dtos.*
import com.marisarichmond.taskmanager.services.NoteManagerService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@CrossOrigin(origins = ["*"])
@RestController
@RequestMapping("/api/private/note_manager")
class NoteManagerController(private val noteManagerService: NoteManagerService) : BaseController() {
    @ResponseBody
    @PostMapping("/notes")
    fun createNote(
        @RequestHeader("userId") userId: UUID,
        @RequestBody createNoteDTO: CreateNoteDTO,
    ): ResponseEntity<NoteDTO> = try {
        ResponseEntity
            .status(HttpStatus.CREATED)
            .body(noteManagerService.createNote(createNoteDTO, userId))
    } catch (exception: Exception) {
        throw baseControllerException(Action.CREATE, exception, Note::class.simpleName)
    }

    @ResponseBody
    @PostMapping("/note/attachments")
    fun createNoteAttachment(
        @RequestBody createNoteAttachmentDTO: CreateNoteAttachmentDTO,
    ): ResponseEntity<NoteAttachmentDTO> = try {
        ResponseEntity
            .status(HttpStatus.CREATED)
            .body(noteManagerService.createNoteAttachment(createNoteAttachmentDTO))
    } catch (exception: Exception) {
        throw baseControllerException(Action.CREATE, exception, NoteAttachment::class.simpleName)
    }

    @ResponseBody
    @PostMapping("/note/tags")
    fun createNoteTag(
        @RequestBody createNoteTagDTO: CreateNoteTagDTO,
    ): ResponseEntity<NoteTagDTO> = try {
        ResponseEntity
            .status(HttpStatus.CREATED)
            .body(noteManagerService.createNoteTag(createNoteTagDTO))
    } catch (exception: Exception) {
        throw baseControllerException(Action.CREATE, exception, NoteTag::class.simpleName)
    }

    @ResponseBody
    @GetMapping
    fun getNoteDataByUserId(@RequestHeader("userId") userId: UUID): ResponseEntity<NoteDataDTO> = try {
        noteManagerService.getNoteDataByUserId(userId).let {
            ResponseEntity.status(HttpStatus.OK).body(it)
        }
    } catch (exception: Exception) {
        throw baseControllerException(Action.GET, exception, Note::class.simpleName)
    }

    @ResponseBody
    @GetMapping("/notes/{noteId}")
    fun getNoteById(
        @RequestHeader("userId") userId: UUID,
        @PathVariable noteId: UUID,
    ): ResponseEntity<NoteDTO> = try {
        ResponseEntity
            .status(HttpStatus.ACCEPTED)
            .body(noteManagerService.getNoteById(noteId, userId))
    } catch (exception: Exception) {
        throw baseControllerException(Action.GET, exception, Note::class.simpleName)
    }

    @ResponseBody
    @PatchMapping("/notes/{noteId}")
    fun updateNoteById(
        @RequestHeader("userId") userId: UUID,
        @PathVariable noteId: UUID,
        @RequestBody updateNoteByIdDTO: UpdateNoteByIdDTO,
    ): ResponseEntity<NoteDTO> = try {
        ResponseEntity
            .status(HttpStatus.ACCEPTED)
            .body(noteManagerService.updateNoteById(noteId, updateNoteByIdDTO, userId))
    } catch (exception: Exception) {
        throw baseControllerException(Action.UPDATE, exception, Note::class.simpleName)
    }

    @ResponseBody
    @PatchMapping("/note/attachments/{attachmentId}")
    fun updateNoteAttachmentById(
        @PathVariable attachmentId: UUID,
        @RequestBody updateAttachmentDTO: UpdateAttachmentDTO,
    ): ResponseEntity<AttachmentDTO> = try {
        ResponseEntity
            .status(HttpStatus.ACCEPTED)
            .body(noteManagerService.updateNoteAttachmentById(attachmentId, updateAttachmentDTO))
    } catch (exception: Exception) {
        throw baseControllerException(Action.UPDATE, exception, NoteAttachment::class.simpleName)
    }

    @ResponseBody
    @DeleteMapping("/{noteId}")
    fun deleteNoteDataByNoteId(
        @PathVariable noteId: UUID,
        @RequestHeader("userId") userId: UUID,
    ): ResponseEntity<String> = try {
        noteManagerService.deleteNoteDataByNoteId(noteId, userId)
        ResponseEntity
            .status(HttpStatus.ACCEPTED)
            .body("${Note::class.simpleName} successfully deleted")
    } catch (exception: Exception) {
        throw baseControllerException(Action.DELETE, exception, NoteDataDTO::class.simpleName)
    }

    @ResponseBody
    @DeleteMapping("/note/attachments/{noteAttachmentId}")
    fun deleteNoteAttachmentById(
        @PathVariable noteAttachmentId: UUID,
        @RequestHeader("userId") userId: UUID,
    ): ResponseEntity<String> = try {
        noteManagerService.deleteNoteAttachmentById(noteAttachmentId, userId)
        ResponseEntity
            .status(HttpStatus.ACCEPTED)
            .body("${NoteAttachment::class.simpleName} successfully deleted")
    } catch (exception: Exception) {
        throw baseControllerException(Action.DELETE, exception, NoteAttachment::class.simpleName)
    }

    @ResponseBody
    @DeleteMapping("/note/tags/{noteTagId}")
    fun deleteNoteTagById(
        @PathVariable noteTagId: UUID,
        @RequestHeader("userId") userId: UUID,
    ): ResponseEntity<String> = try {
        noteManagerService.deleteNoteTagById(noteTagId, userId)
        ResponseEntity
            .status(HttpStatus.ACCEPTED)
            .body("${NoteTag::class.simpleName} successfully deleted")
    } catch (exception: Exception) {
        throw baseControllerException(Action.DELETE, exception, NoteTag::class.simpleName)
    }
}
