import RoomPreview from "./pages/RoomPreview/screens/RoomPreview";
import Room from "./pages/Room/screens/Room";
import ScheduleClass from "./pages/ScheduleClasses/screens/ScheduleClass";
import StudentMathsCourse from "./pages/StudentCourses/Mathematics/screens/MathsCourse";
import StudentChemCourse from "./pages/StudentCourses/Chemistry/screens/ChemCourse";
import SubjectChapterBrowser from "./pages/StudentCourses/Physics/screens/Subject.Chapter.Browser.Screen";
import Viewrecording from "./pages/ViewRecording/screen/Recordings";
import StudentAssignment from "./pages/StudentAssignment/screen/StudentAssignment";
import LibraryScreen from "./pages/SubjectLibrary/screen/LibraryScreen";
import ChapterDetailsScreen from "./pages/StudentCourses/Physics/screens/ChapterDetailsScreen";
import TopicLectureScreen from "./pages/StudentCourses/Physics/screens/TopicLectureScreen";
import SingleLectureDetailsScreen from "./pages/StudentCourses/Physics/screens/SingleLectureDetailsScreen";
import Home from "./components/home/Home";
import AuthLoading from "./components/loaders/AuthLoading";
import StudentCrashCourse from "./pages/StudentCourses/CrashCourse/screens/CrashCourse";
import LectureDetailsById from "./pages/StudentCourses/CrashCourse/screens/lectureDetailsById";
//Mentor Routes

import AllRecordingsForAChapter from "./pages/Mentors/MyCourses/Physics/screen/ChapterRecording";
import MentorAllUploadedLectures from "./pages/Mentors/MyUploads/screen/UploadScreen";
import RateNFeedback from "./pages/Mentors/RatingsAndFeedbacks/screen/RateNFeedback";
import ViewRatingAndFeedback from "./pages/Mentors/RatingsAndFeedbacks/screen/ViewFeedbackAndRating";
import SoloRecordedTopicsDetails from "./pages/Mentors/SoloClasses/TopicCollection/screen/SoloRecordedTopicsDetail";
import RecordedScreen from "./pages/Mentors/SoloClasses/RecordingSoloLectures/screen/RecordedScreen";
import HomePage from "./pages/homepage/screens/HomePage";
import StudentFeedBack from "./components/popups/studentFeedbackPopup";
import StudentFeedbackDetails from "./pages/Mentors/StudentFeedback/screen/studentFeedback";

const publicRoutes = [
  {
    name: "Home",
    path: "/",
    component: <Home />,
  },
  {
    name: "Auth Loading",
    path: "/auth/:unique_id",
    component: <AuthLoading message={"Trying to Logging you in..."} />,
  },
  {
    name: "Auth Loading",
    path: "/auth",
    component: <AuthLoading message={"Logging you in..."} />,
  },
];

const privateRoutes = [
  {
    name: "Homepage",
    path: "/homepage",
    component: <HomePage />,
  },
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
    name: "Student MathsCourse",
    path: "/myCourses/mathematics",
    component: <StudentMathsCourse />,
  },
  {
    name: "Student ChemistryCourse",
    path: "/myCourses/chemistry",
    component: <StudentChemCourse />,
  },
  {
    name: "Student PhysicsCourse",
    path: "/myCourses/physics",
    component: <SubjectChapterBrowser />,
  },

  {
    name: "Chapter Page",
    path: "/chapter-details",
    component: <ChapterDetailsScreen />,
  },

  {
    name: "Lecture Page",
    path: "/topic/lecture/details",
    component: <TopicLectureScreen />,
  },

  {
    name: "Single Lecture Description Covered",
    path: "/:topicname/:roomId",
    component: <SingleLectureDetailsScreen />,
  },

  {
    name: "Student CrashCourse",
    path: "/myCourses/crash-course",
    component: <StudentCrashCourse />,
  },
  {
    name: "Student CrashCourse",
    path: "/myCourses/crash-course/:roomId",
    component: <LectureDetailsById />,
  },
  {
    name: "Student View Recording",
    path: "/view-recording",
    component: <Viewrecording />,
  },

  {
    name: "Student Assignments",
    path: "/student/assignments/:subjectName",
    component: <StudentAssignment />,
  },

  {
    name: "Student Library",
    path: "/library/:subjectName/:subject_id",
    component: <LibraryScreen />,
  },

  {
    name: "Mentor All Recording Related To A Particular Chapter",
    path: "/details/:chapter_id/topics/:chapter_name",
    component: <AllRecordingsForAChapter />,
  },

  {
    name: "Mentor All Uploads",
    path: "/mentor/alluploads",
    component: <MentorAllUploadedLectures />,
  },
  {
    name: "Mentor Rating And Feedback",
    path: "/mentor/rating&feedback",
    component: <RateNFeedback />,
  },
  {
    name: "Viewing Mentors Rating And Feedback",
    path: "/mentor/view/rating&feedback/:topic_id/:topic_name",
    component: <ViewRatingAndFeedback />,
  },
  {
    name: "Solo Recording Detailed And Covered ",
    path: "/mentor/solo-recordings/topic/:topicId/:topic_name",
    component: <SoloRecordedTopicsDetails />,
  },

  {
    name: "Solo Recording Screen ",
    path: "/mentor/solo-lectures/:soloClassRoomId",
    component: <RecordedScreen />,
  },
  {
    name: "Feedback ",
    path: "/feedback",
    component: <StudentFeedBack />,
  },
  {
    name: "Feedback Mentor Screen",
    path: "/feedback-mentor",
    component: <StudentFeedbackDetails />,
  },
];

export { publicRoutes, privateRoutes };
