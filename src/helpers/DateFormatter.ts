import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';

// Extend dayjs with plugins
dayjs.extend(advancedFormat);
dayjs.extend(utc);

/**
 * Formats the given start and end time into a human-readable date and time range.
 * @param {string} startDate - The start date in YYYY-MM-DD format.
 * @param {string} startTime - The start time in HH:mm format.
 * @param {string} endTime - The end time in HH:mm format.
 * @returns {string} Formatted date and time range in "Day of the week • Month Day, Start Time - End Time" format.
 */
export default function formatDateTime(
  startDate: string,
  startTime: string,
  endTime: string,
): string {
  // Create dayjs instances for UTC date/time handling
  const startDateTime = dayjs.utc(`${startDate}T${startTime}`);
  const endDateTime = dayjs.utc(`${startDate}T${endTime}`);

  // Format the date and time
  const formattedDate = startDateTime.format('dddd • MMMM D'); // Day name, month, and day
  const formattedStartTime = startDateTime.format('h:mm A'); // Start time with AM/PM
  const formattedEndTime = endDateTime.format('h:mm A'); // End time with AM/PM

  // Combine into the desired format
  return `${formattedDate}, ${formattedStartTime} - ${formattedEndTime}`;
}
