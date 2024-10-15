const getTodayDate = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const todayDate = new Date();

  const day = days[todayDate.getDay()];
  const date = todayDate.getDate();
  const month = months[todayDate.getMonth()];
  const year = todayDate.getFullYear();

  return { day, date, month, year };
};

export default getTodayDate;
