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
import { publicRoutes, privateRoutes } from "./routes";
import { clearStorageData, getStorageData, isAuthenticated } from "./utils";
import { useSelector } from "react-redux";
import DocumentViewer from "./components/popups/DocumentViewer";
import FeedBackAndRating from "./components/popups/FeedBackAndRating";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { useEffect } from "react";
import StudentFeedBackPopup from "./components/popups/studentFeedbackPopup";

const ProtectedRoutes = () => {
  const isAuth = isAuthenticated();
  if (!isAuth) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

function App() {
  const location = useLocation();
  const { onClose: onDocModalClose } = useDisclosure();
  const { onClose: onFeedBackClose } = useDisclosure();
  const navigate = useNavigate();

  const { isDocModalOpen, isFeedbackModalOpen } = useSelector(
    (state) => state.generic
  );
  const { isStudentFeedbackModalOpen } = useSelector((state) => state.studentFeedback);

  const isNavbarDisabled =
    location.pathname === "/" || location.pathname.startsWith("/auth");

  useEffect(() => {
    // On loading the app remove the below key values if existed somehow in local storage, May be later on we can remove this Line of codes
    localStorage.removeItem("secret_token");
    localStorage.removeItem("insp_user_profile");
  }, []);

  useEffect(() => {
    // Check if the environment is production
    if (process.env.NODE_ENV === "production") {
      function ctrlShiftKey(e, keyCode) {
        return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
      }
      const disableContext = (e) => {
        e.preventDefault();
      };
      const disableDevToolsShortcut = (e) => {
        if (
          e.keyCode === 123 ||
          ctrlShiftKey(e, "I") ||
          ctrlShiftKey(e, "J") ||
          ctrlShiftKey(e, "C") ||
          (e.ctrlKey && e.keyCode === "U".charCodeAt(0))
        )
          e.preventDefault();
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

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      try {
        const data = getStorageData("secret_token");

        if (data && data.status) {
          await clearStorageData();
          navigate("/");
        } else {
          console.log("Videoportal loaded");
        }

        // Handle errors if needed
      } catch (err) {}
      // Custom logic to handle the refresh
      // Display a confirmation message or perform necessary actions
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
