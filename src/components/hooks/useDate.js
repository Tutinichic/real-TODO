const useDate = (date) => {
  const fullDate = new Date(date.replace(/-/g, "/"));
  const year = fullDate.getFullYear();
  const month = fullDate.getMonth() + 1;
  const day = fullDate.getDate();

  const dateFormatted =
    `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}/${year}`;

  return dateFormatted;
};

export default useDate;
