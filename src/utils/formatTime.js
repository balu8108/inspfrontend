import moment from "moment";
const formatTime = (time) => {
  const formattedTime = moment(time, "HH:mm").format("hh:mm A");
  console.log("formatted time", formattedTime);
  return formattedTime;
};
export default formatTime;
