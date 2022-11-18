package com.marisarichmond.taskmanager.models

import java.util.*
import javax.persistence.*

@Entity
@Table(name = "task_templates")
data class TaskTemplate(
    @Id
    override val id: UUID = UUID.randomUUID(),
    val type: String,
    @OneToOne
    @JoinColumn(name = "attachment_type_id")
    val attachmentType: AttachmentType,
) : Base(id) {
    override fun toString(): String = this::class.simpleName + listOf(
        "id = $id",
        "type = $type",
    ).joinToString(", ")
}

enum class TemplateType(
    val type: String,
    val attachmentName: String,
    val defaultObjectives: List<String> = emptyList(),
) {
    CODE_REVIEW(
        "Code Review",
        "PR Link",
    ),
    TASK(
        "Task",
        "JIRA Ticket",
        listOf(
            "Evaluated existing code",
            "Completed task",
            "Wrote tests",
            "Completed self review",
            "Completed code review",
            "Completed design review",
            "Tested changes in staging",
            "Merged change to master",
        ),
    ),
    SPIKE(
        "Spike",
        "Google Link",
        listOf(
            "Investigated options",
            "Documented findings",
        )
    ),
    ISSUE(
        "Issue",
        "Slack Message",
        listOf(
            "Investigated issue",
            "Shared findings with stakeholders",
        )
    ),
    EVENT(
        "Event",
        "Calendar Event",
        listOf(
            "Prepared for discussion",
        )
    ),
}
