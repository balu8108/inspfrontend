import moment from "moment";
const categoriseClass = (data) => {
  const currentDate = moment();
  const scheduledDate = moment(data.scheduledDate);
  const scheduledStartTime = moment(data.scheduledStartTime, "HH:mm:ss");
  const scheduledEndTime = moment(data.scheduledEndTime, "HH:mm:ss");

  if (scheduledDate.isSame(currentDate, "day")) {
    // if it is today then check if it is live or upcoming
    if (
      currentDate.isSameOrAfter(scheduledStartTime) &&
      currentDate.isSameOrBefore(scheduledEndTime)
    ) {
      return "Ongoing";
    } else {
      return "Today";
    }
  } else if (scheduledDate.isSame(currentDate, "week")) {
    // for the current week
    return "Week";
  }
  return "Upcoming";
};

export default categoriseClass;
