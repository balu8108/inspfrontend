import RoomPreview from "./pages/RoomPreview/screens/RoomPreview";
import Room from "./pages/Room/screens/Room";
import ScheduleClass from "./pages/ScheduleClasses/screens/ScheduleClass";
import Viewrecording from "./pages/ViewRecording/screen/Recordings";
import StudentAssignment from "./pages/StudentAssignment/screen/StudentAssignment";
import LibraryScreen from "./pages/SubjectLibrary/screen/LibraryScreen";
import ChaptersTopicPage from "./pages/StudentCourses/Physics/components/ChaptersTopicsPage";
import TopicLectureScreen from "./pages/StudentCourses/Physics/screens/TopicLectureScreen";
import Home from "./components/home/Home";
import AuthLoading from "./components/loaders/AuthLoading";
import LectureDetailsById from "./pages/StudentCourses/components/LectureDetailById";
//Mentor Routes

import MentorAllUploadedLectures from "./pages/Mentors/MyUploads/screen/UploadScreen";
import RateNFeedback from "./pages/Mentors/RatingsAndFeedbacks/screen/RateNFeedback";
import ViewRatingAndFeedback from "./pages/Mentors/RatingsAndFeedbacks/screen/ViewFeedbackAndRating";
import SoloRecordedTopicsDetails from "./pages/Mentors/SoloClasses/TopicCollection/screen/SoloRecordedTopicsDetail";
import RecordedScreen from "./pages/Mentors/SoloClasses/RecordingSoloLectures/screen/RecordedScreen";
import HomePage from "./pages/homepage/screens/HomePage";
import StudentFeedBack from "./components/popups/studentFeedbackPopup";
import StudentFeedbackDetails from "./pages/Mentors/StudentFeedback/screen/studentFeedback";
import MyCourses from "./pages/StudentCourses/components/MyCourses";
import TopicBasedLectures from "./pages/SubjectLibrary/components/TopicBasedLectures";

const publicRoutes = [
  {
    name: "Home",
    path: "/",
    component: <Home />,
  },
  {
    name: "Auth Loading",
    path:
      process.env.REACT_APP_ENVIRON === "production"
        ? "/auth/:unique_id"
        : "/auth/:secret_token",
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
    name: "Chapter Page",
    path: "/chapter-details/:chapterName",
    component: <ChaptersTopicPage />,
  },
  {
    name: "Lecture Page",
    path: "/topic/lecture/:lectureId/:lectureName/details",
    component: <TopicLectureScreen />,
  },
  {
    name: "Student CrashCourse",
    path: "/my-courses/:coursetype",
    component: <MyCourses />,
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
    name: "topic based lecture",
    path: "/library/topic/:topicId/:topicName",
    component: <TopicBasedLectures />,
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
