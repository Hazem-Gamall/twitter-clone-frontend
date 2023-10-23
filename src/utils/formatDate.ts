const options: Intl.DateTimeFormatOptions = {
  month: "long",
  day: "numeric",
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", options);
};

export default formatDate;
