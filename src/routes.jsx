import RoomPreview from "./pages/RoomPreview/screens/RoomPreview";
import Room from "./pages/Room/screens/Room";
import ScheduleClass from "./pages/ScheduleClasses/screens/ScheduleClass";
import StudentHomePage from "./pages/StudentHomePage/screens/HomePage";
import StudentMathsCourse from "./pages/StudentCourses/Mathematics/screens/MathsCourse";
import StudentChemCourse from "./pages/StudentCourses/Chemistry/screens/ChemCourse";
import StudentPhyCourse from "./pages/StudentCourses/Physics/screens/PhysicsCourse";
import Viewrecording from "./pages/ViewRecording/screen/Recordings";
import StudentAssignment from "./pages/StudentAssignment/screen/StudentAssignment";
import PhyLibrary from "./pages/StudentLibrary/PhysicsLibrary/screen/PhyLibrary";
import PhyRecording from "./pages/StudentLibrary/PhysicsLibrary/screen/ViewLectures";
import ViewChapterRecording from "./pages/StudentCourses/Physics/screens/ViewChapRec";
import Home from "./components/home/Home";
import AuthLoading from "./components/loaders/AuthLoading";

//Mentor Routes
import MentorHomePage from "./pages/Mentors/MentorsHomePage/screen/HomePage";

const publicRoutes = [
  {
    name: "Home",
    path: "/",
    component: <Home />,
  },
  {
    name: "Auth Loading",
    path: "/auth",
    component: <AuthLoading message={"Trying to Logging you in..."} />,
  },
  {
    name: "Auth Loading",
    path: "/auth/:secret_token",
    component: <AuthLoading message={"Logging you in..."} />,
  },
];

const privateRoutes = [
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
    name: "Student Homepage",
    path: "/student/homepage",
    component: <StudentHomePage />,
  },

  {
    name: "Student MathsCourse",
    path: "/student/myCourses/mathematics",
    component: <StudentMathsCourse />,
  },
  {
    name: "Student ChemistryCourse",
    path: "/student/myCourses/chemistry",
    component: <StudentChemCourse />,
  },
  {
    name: "Student PhysicsCourse",
    path: "/student/myCourses/physics",
    component: <StudentPhyCourse />,
  },
  {
    name: "Student View Recording",
    path: "/view-recording",
    component: <Viewrecording />,
  },
  {
    name: "Student Assignments",
    path: "/student/assignments",
    component: <StudentAssignment />,
  },
  {
    name: "Student Library",
    path: "/student/physics-library",
    component: <PhyLibrary />,
  },

  {
    name: "Student Physics Videos",
    path: "/student/physics-library/:chapterName",
    component: <PhyRecording />,
  },
  {
    name: "Chapter Recording",
    path: "/student/chapter",
    component: <ViewChapterRecording />,
  },
  {
    name: "Mentor HomePage",
    path: "/mentor/homepage",
    component: <MentorHomePage />,
  },
];

export { publicRoutes, privateRoutes };
