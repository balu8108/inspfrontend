import RoomPreview from "./pages/RoomPreview/screens/RoomPreview";
import Room from "./pages/Room/screens/Room";
import ScheduleClass from "./pages/ScheduleClasses/screens/ScheduleClass";
import StudentCourses from "./pages/StudentCourses/screens/StudentCourses";
import StudentAssignment from "./pages/StudentAssignment/screens/StudentAssignment";
import StudentHomePage from "./pages/StudentHomePage/screens/HomePage";
const routes = [
  {
    name: "Room Preview",
    path: "/room-preview/:roomId",
    component: <RoomPreview />,
  },
  {
    name: "Room",
    path: "/room/:roomId",
    component: <Room />,
  },
  {
    name: "Schedule class",
    path: "/schedule-class",
    component: <ScheduleClass />,
  },

  {
    name: "Student courses",
    path: "/student/courses",
    component: <StudentCourses />,
  },

  {
    name: "Student Assignment",
    path: "/student/assignment",
    component: <StudentAssignment />,
  },

  {
    name: "Student Homepage",
    path: "/student/homepage",
    component: <StudentHomePage />,
  },
];

export default routes;
