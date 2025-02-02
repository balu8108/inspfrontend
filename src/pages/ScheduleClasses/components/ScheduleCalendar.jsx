import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { useTheme } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { scheduleClassData } from "../data/scheduleClassData";
import { checkUserType } from "../../../utils";
import { userType } from "../../../constants/staticvariables";
import { className } from "../../../constants/className";
import {
  setCalenderDate,
  setCalenderTime,
} from "../../../store/actions/genericActions";
import { getAllLiveCalanderClasses } from "../../../store/actions/scheduleClassActions";

// Styling of full calendar is in app.css
const ScheduleCalendar = ({ onSchedulePopupOpen }) => {
  const dispatch = useDispatch();
  const { eventLightGreen } = useTheme().colors.pallete;
  const { scheduledClasses } = useSelector((state) => state.scheduleClass);
  const { userProfile } = useSelector((state) => state.auth);

  const handleDateClick = (args) => {
    const { view, date } = args;
    const originalDate = new Date(date);
    const formattedDate = moment(originalDate).format("YYYY-MM-DD");
    const formattedTime = moment(originalDate).format("HH:mm");
    dispatch(setCalenderDate(formattedDate));
    if (view.type !== scheduleClassData.calendarTypes.dayGridMonth) {
      dispatch(setCalenderTime([formattedTime, "--:--"]));
    }

    // open schedule pop up box
    onSchedulePopupOpen();
  };

  const classTypeArray = {
    CRASHCOURSE: "Crash Course",
    REGULARCLASS: "Regular Classes",
  };

  useEffect(() => {
    dispatch(getAllLiveCalanderClasses());
  }, [dispatch]);

  // a custom render function
  function renderEventContent(eventInfo) {
    return (
      <div style={{ color: "gray", fontSize: "12px" }}>
        <p style={{ whiteSpace: "normal", marginBottom: "2px" }}>
          {eventInfo?.event?._def?.title}
        </p>
        <p style={{ whiteSpace: "normal", marginBottom: "2px" }}>
          {classTypeArray[eventInfo?.event?._def?.extendedProps?.classType]}
        </p>
        <p style={{ whiteSpace: "normal", marginBottom: "2px" }}>
          {className[eventInfo?.event?._def?.extendedProps?.classLevel]}
        </p>
      </div>
    );
  }

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
      eventDisplay="inline"
      displayEventTime={true}
      eventTimeFormat={{
        hour: "numeric",
        minute: "2-digit",
        meridiem: true,
      }}
      dateClick={
        checkUserType(userProfile) === userType.teacher
          ? handleDateClick
          : () => {}
      }
      events={scheduledClasses}
      eventContent={renderEventContent}
    />
  );
};

export default ScheduleCalendar;
