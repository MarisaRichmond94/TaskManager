package com.marisarichmond.taskmanager.exceptions

/**
 * An exception for when an expected [type] is not found in the database by [retrievalField] with a value
 * [retrievalFieldValue].
 */
class EntityNotFoundException(
    entityType: String? = "Entity",
    retrievalFieldValue: Any,
    retrievalField: String = "id"
) : RuntimeException("$entityType by $retrievalField \"$retrievalFieldValue\" not found.")
