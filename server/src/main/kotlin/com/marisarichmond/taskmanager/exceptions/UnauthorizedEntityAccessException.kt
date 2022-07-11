package com.marisarichmond.taskmanager.exceptions

import java.util.*

class UnauthorizedEntityAccessException(
    userId: UUID,
    action: String,
    entityId: UUID,
    entityType: String,
) : RuntimeException(
    "User with id \"$userId\" attempted to perform $action operation on unauthorized $entityType with id \"$entityId\"."
)
