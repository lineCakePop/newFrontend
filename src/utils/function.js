export const daysToDate = (date) => {
  let today = new Date(Date.now());
  let todayMidNight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  let userBD = new Date(date);
  let userBDMidNight = new Date(
    today.getFullYear(),
    userBD.getMonth(),
    userBD.getDate(),
  );
  userBDMidNight =
    userBDMidNight < todayMidNight
      ? new Date(today.getFullYear() + 1, userBD.getMonth(), userBD.getDate())
      : userBDMidNight;
  // console.log(userBDMidNight);
  const dayDiff = Math.floor(
    (userBDMidNight - todayMidNight) / (1000 * 60 * 60 * 24),
  );
  return dayDiff;
};


export const formatDate = (utcTimestamp) => {
  if (utcTimestamp) {
    const date = new Date(utcTimestamp);

    const options = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true, // Use 12-hour clock format
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    const dateArray = new Intl.DateTimeFormat("en-US", options)
      .format(date)
      .split(/,|\//);

    return `on ${dateArray[3]} ${dateArray[0]}/${dateArray[1]}`;
  }
  return "";
};