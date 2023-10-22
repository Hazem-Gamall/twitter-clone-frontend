const options: Intl.DateTimeFormatOptions = {
  month: "long",
  day: "numeric",
};

const formatDate = (date: Date) => {
  console.log(date);

  return date.toLocaleDateString("en-US", options);
};

export default formatDate;
