import RoomPreview from "./pages/RoomPreview/screens/RoomPreview";
import Room from "./pages/Room/screens/Room";
import ScheduleClass from "./pages/ScheduleClasses/screens/ScheduleClass";
import StudentHomePage from "./pages/StudentHomePage/screens/HomePage";
import StudentMathsCourse from "./pages/StudentCourses/Mathematics/screens/MathsCourse"
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
    name:"Student Homepage",
    path:"/student/homepage",
    component:<StudentHomePage />
  },

  {
    name:"Student MathsCourse",
    path:"/student/myCourses/maths",
    component:<StudentMathsCourse />
  }

];

export default routes;
