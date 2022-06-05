package com.marisarichmond.taskmanager.extensions

private const val EMAIL_REGEX = "^[A-Za-z](.*)([@]{1})(.{1,})(\\.)(.{1,})"

/**
 * Checks to see if a string only contains alphabet characters (casing insensitive).
 */
fun String.isAlphaOnly(): Boolean {
    return this.none { it !in 'A'..'Z' && it !in 'a'..'z' }
}

/**
 * Verifies that a string is a valid email address.
 */
fun String.isValidEmail(): Boolean = EMAIL_REGEX.toRegex().matches(this)
