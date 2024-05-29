import "./App.css";
import { useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./components/navbar/Navbar";
import { publicRoutes, privateRoutes } from "./routes";
import { checkUserType } from "./utils";
import DocumentViewer from "./components/popups/DocumentViewer";
import FeedBackAndRating from "./components/popups/FeedBackAndRating";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import StudentFeedBackPopup from "./components/popups/studentFeedbackPopup";
import ScheduleClassPopup from "./components/popups/ScheduleClassPopup";
import { fetchAllSubjectsApi } from "./api/inspexternalapis";
import { getAllSubjects } from "./store/actions/genericActions";
import { userType } from "./constants/staticvariables";
import ScheduleClassList from "./pages/ScheduleClasses/components/ScheduleClassList";
// import { detectDevTools, CheckWindowHeight } from "./utils/detectDevtools";
const allowedRoutes = [
  "/schedule-class",
  "/view-recording",
  "/room-preview/:roomId",
  "/room/:roomId",
  "/mentor/solo-lectures/:soloClassRoomId",
  "/feedback-mentor",
  "/feedback",
];

const ProtectedRoutes = ({ userRoleType }) => {
  const { userProfile, secretToken } = useSelector((state) => state.auth);
  // CheckWindowHeight(userRoleType);
  return userProfile && secretToken ? <Outlet /> : <Navigate to="/" />;
};

function App() {
  const location = useLocation();
  const { onClose: onDocModalClose } = useDisclosure();
  const { onClose: onFeedBackClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userProfile, secretToken } = useSelector((state) => state.auth);
  const userRoleType = checkUserType(userProfile);
  const { isDocModalOpen, isFeedbackModalOpen } = useSelector(
    (state) => state.generic
  );
  const { isStudentFeedbackModalOpen } = useSelector(
    (state) => state.studentFeedback
  );
  const {
    isOpen: isSchedulePopupOpen,
    onOpen: onSchedulePopupOpen,
    onClose: onScheduleClosePopupOpen,
  } = useDisclosure();
  const isNavbarDisabled =
    location.pathname === "/" || location.pathname.startsWith("/auth");

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      // detectDevTools(userRoleType);
      const disableContext = (e) => e.preventDefault();
      const disableDevToolsShortcut = (e) => {
        const ctrlShiftKey = (e, keyCode) =>
          e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
        if (
          e.keyCode === 123 ||
          ctrlShiftKey(e, "I") ||
          ctrlShiftKey(e, "J") ||
          ctrlShiftKey(e, "C") ||
          (e.ctrlKey && e.keyCode === "U".charCodeAt(0)) ||
          e.keyCode === 105 ||
          (e.metaKey && e.altKey && e.keyCode === "I".charCodeAt(0)) ||
          (e.metaKey && e.altKey && e.keyCode === "J".charCodeAt(0)) ||
          (e.metaKey && e.altKey && e.keyCode === "C".charCodeAt(0)) ||
          (e.metaKey && e.altKey && e.keyCode === "U".charCodeAt(0))
        ) {
          e.preventDefault();
        }
      };
      window.addEventListener("contextmenu", disableContext);
      window.addEventListener("keydown", disableDevToolsShortcut);
      return () => {
        window.removeEventListener("contextmenu", disableContext);
        window.removeEventListener("keydown", disableDevToolsShortcut);
      };
    }
  }, [userRoleType]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (secretToken) {
        navigate("/");
      } else {
        console.log("Videoportal loaded");
      }
    };
    if (userRoleType === userType.student) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }
    return () => {
      if (userRoleType === userType.student) {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      }
    };
  }, [userRoleType, secretToken, navigate]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetchAllSubjectsApi();
        if (response.status) {
          const subjectsFromAPI = response.result;
          const sortedSubjects = subjectsFromAPI.sort((a, b) =>
            b.name.localeCompare(a.name)
          );
          const updatedSubjects = sortedSubjects.map((item) => ({
            id: item.id,
            name: item.name,
            value: item.name,
          }));
          dispatch(
            getAllSubjects([
              {
                id: "4",
                name: "INSP Champ Crash Course",
                value: "crash-course",
              },
              {
                id: "7",
                name: "INSP Foundation Olympiad",
                value: "foundation-olympiad",
              },
              {
                id: "8",
                name: "INPHO / Olympiads",
                value: "inpho-olympiads",
              },
              { id: "5", name: "Class 11th", value: "class-11" },
              { id: "6", name: "Class 12th", value: "class-12" },
              ...updatedSubjects,
            ])
          );
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, [dispatch]);

  return (
    <>
      {!isNavbarDisabled && <Navbar />}
      {isDocModalOpen && (
        <DocumentViewer isOpen={isDocModalOpen} onClose={onDocModalClose} />
      )}
      {isSchedulePopupOpen && (
        <ScheduleClassPopup
          isOpen={isSchedulePopupOpen}
          onClose={onScheduleClosePopupOpen}
          isCalenderScreen={false}
        />
      )}
      <FeedBackAndRating
        isOpen={isFeedbackModalOpen}
        onClose={onFeedBackClose}
      />
      <StudentFeedBackPopup
        isOpen={isStudentFeedbackModalOpen}
        onClose={onFeedBackClose}
      />
      <ScrollToTop />
      <Routes>
        <Route element={<ProtectedRoutes userRoleType={userRoleType} />}>
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <>
                  {allowedRoutes.includes(route.path) ? (
                    route.component
                  ) : (
                    <Flex m={"52px"}>
                      <Box w={"75%"}>{route.component}</Box>
                      <ScheduleClassList
                        onSchedulePopupOpen={onSchedulePopupOpen}
                      />
                    </Flex>
                  )}
                </>
              }
            />
          ))}
        </Route>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Routes>
    </>
  );
}

export default App;
