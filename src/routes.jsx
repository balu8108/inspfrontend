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
import Home from "./components/home/Home";
import AuthLoading from "./components/loaders/AuthLoading";
import StudentCrashCourse from "./pages/StudentCourses/CrashCourse/CrashCourse";
import LectureDetailsById from "./pages/StudentCourses/components/LectureDetailById";
import Grade11Screen from "./pages/StudentCourses/Class11/Grade11Screen";
import Grade12Screen from "./pages/StudentCourses/Class12/Grade12Screen";
import FoundationCourseScreen from "./pages/StudentCourses/FoundationCourse/FoundationCourseScreen";
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
    path: "/auth/:secret_token",
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
    path: "/my-courses/mathematics",
    component: <StudentMathsCourse />,
  },
  {
    name: "Student ChemistryCourse",
    path: "/my-courses/chemistry",
    component: <StudentChemCourse />,
  },
  {
    name: "Student PhysicsCourse",
    path: "/my-courses/physics",
    component: <SubjectChapterBrowser />,
  },

  {
    name: "Chapter Page",
    path: "/chapter-details/:chapterName",
    component: <ChapterDetailsScreen />,
  },

  {
    name: "Lecture Page",
    path: "/topic/lecture/:lectureName/details",
    component: <TopicLectureScreen />,
  },
  {
    name: "Student CrashCourse",
    path: "/my-courses/crash-course",
    component: <StudentCrashCourse />,
  },
  {
    name: "Student Class 11th Course",
    path: "/my-courses/class-11",
    component: <Grade11Screen />,
  },
  {
    name: "Student Class 12th Course",
    path: "/my-courses/class-12",
    component: <Grade12Screen />,
  },
  {
    name: "Student Foundation  Course",
    path: "/my-courses/foundation-course",
    component: <FoundationCourseScreen />,
  },
  {
    name: "Student CrashCourse",
    path: "/my-courses/lecture-detail/:roomId/:courseType",
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
