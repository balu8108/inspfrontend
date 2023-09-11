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
    } else if (currentDate.isBefore(scheduledStartTime)) {
      return "Today";
    } else if (currentDate.isAfter(scheduledEndTime)) {
      return "Completed"; // New category for all past classes
    }
  } else if (
    scheduledDate.isSame(currentDate, "week") &&
    currentDate.isBefore(scheduledStartTime)
  ) {
    // for the current week
    return "Week";
  } else if (
    scheduledDate.isSame(currentDate, "week") &&
    currentDate.isAfter(scheduledEndTime)
  ) {
    // later on we also need to check if the class is Finished or not and then return the category
    return "Completed"; // New category for all past classes outside of the current day and week
  }
  return "Upcoming";
};

export default categoriseClass;
