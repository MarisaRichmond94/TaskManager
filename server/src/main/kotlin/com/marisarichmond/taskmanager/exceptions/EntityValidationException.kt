package com.marisarichmond.taskmanager.exceptions

/**
 * An exception for non-ORM validation issues (i.e. a String that is only supposed to contain
 * alpha characters contains integers).
 */
class EntityValidationException(
    entity: String,
    field: String,
    value: Any,
    reason: String,
) : RuntimeException("$entity $field \"$value\" failed validation: $reason.")
