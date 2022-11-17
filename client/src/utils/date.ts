/**
 * Converts a JS Date object to seconds since epoch or, if given a number, divides the
 * given number by 1000 to go from milliseconds since epoch to seconds since epoch.
 * @param feDatetime - either a number value representing the milliseconds since epoch or
 * a JS Date object
 * @returns a number represending seconds since epoch
 */
const toServerDatetime = (feDatetime: Date | number): number => {
  if (feDatetime instanceof Date) return feDatetime.valueOf() / 1000;
  if (typeof feDatetime === 'number') return feDatetime / 1000;
  throw Error(`toServerDatetime recieved invalid type ${typeof feDatetime} with value ${feDatetime}`);
};

/**
 * Multiplies the number returned from the server -- given in seconds since epoch -- by 1000
 * in order to get the milliseconds since epoch needed to create a JS Date object.
 * @param beDatetime - the current UTC datetime in seconds since the epoch
 * @returns a JS Date object
 */
const toClientDatetime = (beDatetime: number): Date => new Date(beDatetime * 1000);

/**
 * A function to compare two dates, which will handle conversion.
 * @param dateToCheck - the date to compare
 * @param dateToCheckAgainst - the date being compared to
 * @param isBeforeCheck - whether or not the check is to see if the [dateToCheck] is before the
 * [dateToCheckAgainst]
 * @returns a boolean representing whether or not the [dateToCheck] is in the expected position in
 * respects to the [dateToCheckAgainst]
 */
const compareDates = (
  dateToCheck: Date | number,
  dateToCheckAgainst: Date | number,
  isBeforeCheck: boolean = true,
): boolean => {
  if (dateToCheck instanceof Date) dateToCheck = toServerDatetime(dateToCheck);
  if (dateToCheckAgainst instanceof Date) dateToCheckAgainst = toServerDatetime(dateToCheckAgainst);
  return isBeforeCheck ? dateToCheck < dateToCheckAgainst : dateToCheck >= dateToCheckAgainst;
};

/**
 * Adds or subtracts days from a JS Date object by a given +/- modifying integer.
 * @param today - the JS Date object to modify
 * @param modifier - a +/- integer to modify the date by (in days)
 * @returns a JS Date object modified by the number of days given
 */
const getModifiedDate = (today: Date, modifier: number): Date => {
  const modifiedDate = new Date();
  modifiedDate.setDate(today.getDate() + modifier);
  return modifiedDate;
};

/**
 * Formats a JavaScript [Date] into a full date string.
 * @param date - A JavaScript [Date]
 * @returns a date in the format MM/DD/YYYY
 */
const getFullDateString = (date: Date): string => `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;

  /**
   * Formats a JavaScript [Date] into a shortened date string.
   * @param date - A JavaScript [Date]
   * @returns a date in the format MM/DD
   */
const getDayMonthDateString = (date: Date): string => `${date.getMonth()+1}/${date.getDate()}`;

/**
 * Gets the timestamp from a JavaScript [Date] object
 * @param date - A JavaScript [Date]
 * @returns the timestamp of a day in the format HH:MM (AM/PM)
 */
const getTimestampString = (date: Date): string => {
  const standardHours = convertMilitaryToStandardTime(date.getHours());
  const minutes = date.getMinutes();
  return `${standardHours}:${minutes < 10 ? '0' : ''}${minutes} ${date.getHours() > 12 ? 'PM' : 'AM'}`;
};

/**
 * Converts hours from military time to standard time
 * @param militaryHours - A number between 0 and 24 representing the hours
 * @returns the number of hours using standard time
 */
const convertMilitaryToStandardTime = (militaryHours: number): number => {
  return (militaryHours === 0) // it is exactly midnight
    ? 12
    : (militaryHours <= 12) // it is before noon or exactly noon
      ? militaryHours
      : militaryHours - 12; // it is between noon and midnight
};

export {
  toClientDatetime,
  toServerDatetime,
  compareDates,
  getDayMonthDateString,
  getFullDateString,
  getModifiedDate,
  getTimestampString,
};
