package com.marisarichmond.taskmanager.exceptions

import com.marisarichmond.taskmanager.controllers.Action
import java.util.*

class UnauthorizedEntityAccessException(
    userId: UUID,
    action: Action,
    entityId: UUID,
    entityType: String? = "Entity",
) : RuntimeException(
    "User with id \"$userId\" attempted to perform $action operation on unauthorized $entityType with id \"$entityId\"."
)
