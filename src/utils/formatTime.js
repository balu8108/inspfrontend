import moment from "moment";
const formatTime = (time) => {
  if (!time) {
    return "No Data";
  }
  const formattedTime = moment(time, "HH:mm").format("hh:mm A");
  return formattedTime;
};
export default formatTime;
