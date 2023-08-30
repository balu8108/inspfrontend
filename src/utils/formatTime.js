import moment from "moment";
export const formatTime = (time) => {
  if (!time) {
    return "No Data";
  }
  const formattedTime = moment(time, "HH:mm").format("hh:mm A");
  return formattedTime;
};

export const timeDifference = (startTime, endTime) => {
  if (!startTime || !endTime) {
    return 0;
  }
  const start = moment(startTime, "HH:mm:ss");
  const end = moment(endTime, "HH:mm:ss");
  const duration = moment.duration(end.diff(start));
  const hours = duration.hours();
  const minutes = duration.minutes();
  // return string
  if (hours === 0) {
    return `(${minutes} min)`;
  } else if (hours > 0 && minutes === 0) {
    return `(${hours} hr)`;
  } else if (hours > 0 && minutes > 0) {
    return `(${hours} hr ${minutes} min)`;
  }
};
