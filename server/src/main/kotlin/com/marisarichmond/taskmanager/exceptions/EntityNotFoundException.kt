package com.marisarichmond.taskmanager.exceptions

/**
 * An exception for when an expected [type] is not found in the database by [retrievalField] with a value
 * [retrievalFieldValue].
 */
class EntityNotFoundException(
    type: String,
    retrievalFieldValue: Any,
    retrievalField: String = "id"
) : RuntimeException("$type by $retrievalField \"$retrievalFieldValue\" not found.")
