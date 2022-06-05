package com.marisarichmond.taskmanager.extensions

import java.util.*

/**
 * This extension function is used to convert Hibernate Optional values to nullable values
 * to prevent integration issues with Kotlin typing.
 */
fun <T> Optional<T>.unwrap(): T? = orElse(null)
