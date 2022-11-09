package com.marisarichmond.taskmanager.exceptions

import com.marisarichmond.taskmanager.controllers.Action

class UpstreamEntityOperationException(
    action: Action,
    entityType: String? = "entity",
) : RuntimeException("$action failed for upstream $entityType")
