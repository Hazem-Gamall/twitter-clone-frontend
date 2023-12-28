const yearOptions: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
};

const monthOptions: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
};

const millisToSeconds = (millis: number) => {
  return Math.floor(millis / 1000);
};

const millisToMinutes = (millis: number) => {
  return Math.floor(millisToSeconds(millis) / 60);
};

const millisToHours = (millis: number) => {
  return Math.floor(millisToMinutes(millis) / 60);
};

const millisToDays = (millis: number) => {
  return Math.floor(millisToHours(millis) / 24);
};

const formatDateWithYear = (date: Date) => {
  return date.toLocaleDateString("en-US", yearOptions);
};

const formatDateWithMonthOnly = (date: Date) => {
  return date.toLocaleDateString("en-US", monthOptions);
};

const formatDateWithMinuteOrHour = (difference: number) => {
  let convertedDate = millisToHours(difference);
  if (convertedDate > 0) return `${convertedDate}h`;
  convertedDate = millisToMinutes(difference);
  if (convertedDate > 0) return `${convertedDate}m`;
  return `${millisToSeconds(difference)}s`;
};

const formatDate = (date: Date) => {
  const now = new Date();
  const difference = now.valueOf() - date.valueOf();

  if (millisToDays(difference) > 365) return formatDateWithYear(date);
  if (millisToHours(difference) > 24) return formatDateWithMonthOnly(date);

  return formatDateWithMinuteOrHour(difference);
};

export default formatDate;
