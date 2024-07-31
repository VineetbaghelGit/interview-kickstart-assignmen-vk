import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';

// Extend dayjs with the necessary plugins
dayjs.extend(advancedFormat);
dayjs.extend(utc);

export default function formatDateTime(
  startDate: string,
  startTime: string,
  endTime: string,
): string {
  // Create dayjs instances
  const startDateTime = dayjs.utc(`${startDate}T${startTime}`); // Adjust if local time
  const endDateTime = dayjs.utc(`${startDate}T${endTime}`); // Adjust if local time

  // Format the date and time
  const formattedDate = startDateTime.format('dddd • MMMM D'); // Day name, month, and day
  const formattedStartTime = startDateTime.format('h:mm A'); // Start time with AM/PM
  const formattedEndTime = endDateTime.format('h:mm A'); // End time with AM/PM

  // Combine into the desired format
  return `${formattedDate}, ${formattedStartTime} - ${formattedEndTime}`;
}
