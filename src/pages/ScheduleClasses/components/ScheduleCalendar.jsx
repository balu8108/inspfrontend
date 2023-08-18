import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { useTheme } from "@chakra-ui/react";

// Styling of full calendar is in app.css
const ScheduleCalendar = () => {
  const { eventLightGreen, eventLightBlue } = useTheme().colors.pallete;
  return (
    <>
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
        events={[
          {
            title: "Newton's law",
            start: "2023-08-16T14:30:00",
            end: "2023-08-16T16:00:00",
          },
          // Add more events here
        ]}
      />
    </>
  );
};

export default ScheduleCalendar;
