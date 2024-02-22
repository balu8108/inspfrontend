import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { useDisclosure } from "@chakra-ui/react";
import { Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import { isAuthenticated } from "./utils";
import { useSelector } from "react-redux";
import DocumentViewer from "./components/popups/DocumentViewer";
import FeedBackAndRating from "./components/popups/FeedBackAndRating";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { useEffect } from "react";
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

  const { isDocModalOpen, isFeedbackModalOpen } = useSelector(
    (state) => state.generic
  );

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
