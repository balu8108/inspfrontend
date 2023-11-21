import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { useTheme } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import moment from "moment";
import { scheduleClassData } from "../data/scheduleClassData";
import { checkUserType } from "../../../utils";
import { userType } from "../../../constants/staticvariables";

// Styling of full calendar is in app.css
const ScheduleCalendar = ({
  onSchedulePopupOpen,
  setSelectedDate,
  setClassTiming,
}) => {
  const { eventLightGreen } = useTheme().colors.pallete;
  const { scheduledClasses } = useSelector((state) => state.scheduleClass);
  console.log("scheduledClass", scheduledClasses);

  const handleDateClick = (args) => {
    const { view, date } = args;
    const originalDate = new Date(date);
    const formattedDate = moment(originalDate).format("YYYY-MM-DD");
    const formattedTime = moment(originalDate).format("HH:mm");
    setSelectedDate(formattedDate);
    if (view.type !== scheduleClassData.calendarTypes.dayGridMonth) {
      setClassTiming([formattedTime, "--:--"]); // as we will get only start time
    }

    // open schedule pop up box
    onSchedulePopupOpen();
  };
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      eventBackgroundColor={eventLightGreen}
      eventBorderColor={eventLightGreen}
      eventDisplay="block"
      displayEventTime={true}
      eventTimeFormat={{
        hour: "numeric",
        minute: "2-digit",
        meridiem: true,
      }}
      dateClick={
        checkUserType() === userType.teacher ? handleDateClick : () => {}
      }
      events={scheduledClasses}
    />
  );
};

export default ScheduleCalendar;
