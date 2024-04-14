const formatDate = (dateString) => {
  const date = new Date(dateString);

  const options = {
    day: "2-digit",
    month: "short", //show abbreviation of the month
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};

export default formatDate;
