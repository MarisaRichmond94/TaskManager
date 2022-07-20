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
 * Adds or subtracts days from a JS Date object by a given +/- modifying integer.
 * @param today - the JS Date object to modify
 * @param modifier - a +/- integer to modify the date by (in days)
 * @returns a JS Date object modified by the number of days given
 */
const getModifiedDate = (today: Date, modifier: number): Date => {
  const modifiedDate = new Date();
  modifiedDate.setDate(today.getDate() + modifier);
  return modifiedDate;
}

const getFullDateString = (date: Date): string =>
  `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;

const getDayMonthDateString = (date: Date): string => `${date.getMonth()+1}/${date.getDate()}`;

const getTimestampString = (date: Date): string => {
  const standardHours = convertMilitaryToStandardTime(date.getHours());
  return `${standardHours}:${date.getMinutes()} ${date.getHours() > 12 ? 'PM' : 'AM'}`;
};

const convertMilitaryToStandardTime = (militaryHours: number): number => {
  return (militaryHours === 0) // it is exactly midnight
    ? 12
    : (militaryHours <= 12) // it is before noon or exactly noon
      ? militaryHours
      : militaryHours - 12; // it is between noon and midnight
}

export {
  toClientDatetime,
  toServerDatetime,
  getDayMonthDateString,
  getFullDateString,
  getModifiedDate,
  getTimestampString,
};
