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
