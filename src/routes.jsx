import RoomPreview from "./pages/RoomPreview/screens/RoomPreview";
import Room from "./pages/Room/screens/Room";
import ScheduleClass from "./pages/ScheduleClasses/screens/ScheduleClass";
import StudentHomePage from "./pages/StudentHomePage/screens/HomePage";
import StudentMathsCourse from "./pages/StudentCourses/Mathematics/screens/MathsCourse";
import StudentChemCourse from "./pages/StudentCourses/Chemistry/screens/ChemCourse";
import StudentPhyCourse from "./pages/StudentCourses/Physics/screens/PhysicsCourse";
import Viewrecording from "./pages/ViewRecording/screen/Recordings";
import StudentAssignment from "./pages/StudentAssignment/screen/StudentAssignment";
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
    path:"/student/myCourses/mathematics",
    component:<StudentMathsCourse />
  },
  {
    name:"Student ChemistryCourse",
    path:"/student/myCourses/chemistry",
    component:<StudentChemCourse />
  },
  {
    name:"Student PhysicsCourse",
    path:"/student/myCourses/physics",
    component:<StudentPhyCourse />
  },
  {
    name:"Student View Recording",
    path:"/viewRecording",
    component:<Viewrecording />
  },
  {
    name:"Student Assignments",
    path:"/student/assignment",
    component:<StudentAssignment />
  },

 
];

export default routes;
