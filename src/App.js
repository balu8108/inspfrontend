import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { useDisclosure } from "@chakra-ui/react";
import {
  Routes,
  Route,
  useLocation,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { publicRoutes, privateRoutes } from "./routes";
import { checkUserType } from "./utils";
import DocumentViewer from "./components/popups/DocumentViewer";
import FeedBackAndRating from "./components/popups/FeedBackAndRating";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { useEffect } from "react";
import StudentFeedBackPopup from "./components/popups/studentFeedbackPopup";
import { fetchAllSubjectsApi } from "./api/inspexternalapis";
import { getAllSubjects } from "./store/actions/genericActions";
import { userType } from "./constants/staticvariables";
import detectDevTools from "./utils/detectDevtools";
const ProtectedRoutes = () => {
  const { userProfile, secretToken } = useSelector((state) => state.auth);
  if ((userProfile, secretToken)) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};
function App() {
  const location = useLocation();
  const { onClose: onDocModalClose } = useDisclosure();
  const { onClose: onFeedBackClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.auth);
  const userRoleType = checkUserType(userProfile);
  const { isDocModalOpen, isFeedbackModalOpen } = useSelector(
    (state) => state.generic
  );
  const { isStudentFeedbackModalOpen } = useSelector(
    (state) => state.studentFeedback
  );
  const isNavbarDisabled =
    location.pathname === "/" || location.pathname.startsWith("/auth");
  useEffect(() => {
    // Check if the environment is production
    if (process.env.NODE_ENV === "production") {
      // Call detectDevTools function when the component mounts
      detectDevTools();
      function ctrlShiftKey(e, keyCode) {
        return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
      }
      const disableContext = (e) => {
        e.preventDefault();
      };
      const disableDevToolsShortcut = (e) => {
        // Windows shortcuts
        if (e.keyCode === 123) {
          e.preventDefault();
        }
        if (ctrlShiftKey(e, "I")) {
          e.preventDefault();
        }
        if (ctrlShiftKey(e, "J")) {
          e.preventDefault();
        }
        if (ctrlShiftKey(e, "C")) {
          e.preventDefault();
        }
        if (e.ctrlKey && e.keyCode === "U".charCodeAt(0)) {
          // Ctrl+U
          e.preventDefault();
        }
        // macOS shortcuts
        if (e.keyCode === 105) {
          // F12 or Command+Option+I
          e.preventDefault();
        }
        if (e.metaKey && e.altKey && e.keyCode === "I".charCodeAt(0)) {
          e.preventDefault();
        }
        if (e.metaKey && e.altKey && e.keyCode === "J".charCodeAt(0)) {
          // Command+Option+J
          e.preventDefault();
        }
        if (e.metaKey && e.altKey && e.keyCode === "C".charCodeAt(0)) {
          // Command+Option+C
          e.preventDefault();
        }
        if (e.metaKey && e.altKey && e.keyCode === "U".charCodeAt(0)) {
          // Command+Option+U
          e.preventDefault();
        }
      };
      window.addEventListener("contextmenu", disableContext);
      window.addEventListener("keydown", disableDevToolsShortcut);
      // Remove the event listeners when the component unmounts
      return () => {
        window.removeEventListener("contextmenu", disableContext);
        window.removeEventListener("keydown", disableDevToolsShortcut);
      };
    }
  }, []);
  const { secretToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      try {
        if (secretToken) {
          navigate("/");
        } else {
          console.log("Videoportal loaded");
        }
      } catch (err) {}
    };
    if (userRoleType === userType.student) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }
    return () => {
      if (userRoleType === userType.student) {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      }
    };
  }, [userRoleType]);
  useEffect(() => {
    async function fetchSubjects() {
      try {
        const response = await fetchAllSubjectsApi();
        if (response.status) {
          const subjectsFromAPI = response.result;
          const sortedSubjects = subjectsFromAPI.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
          const reversedSubjects = sortedSubjects.reverse();
          const updatedSubjects = reversedSubjects.map((item) => {
            return {
              id: item.id,
              name: item.name,
              value: item.name,
            };
          });
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
              {
                id: "5",
                name: "Class 11th",
                value: "class-11",
              },
              {
                id: "6",
                name: "Class 12th",
                value: "class-12",
              },
              ...updatedSubjects,
            ])
          );
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    }
    fetchSubjects();
  }, [dispatch]);
  return (
    <>
      {!isNavbarDisabled && <Navbar />}
      {isDocModalOpen && (
        <DocumentViewer isOpen={isDocModalOpen} onClose={onDocModalClose} />
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
        <Route element={<ProtectedRoutes />}>
          {privateRoutes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            );
          })}
        </Route>
        {publicRoutes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          );
        })}
      </Routes>
    </>
  );
}
export default App;
