import "./App.css";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/navbar/Navbar";
import { useDisclosure } from "@chakra-ui/react";
import { Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import { isAuthenticated } from "./utils";
import { useSelector } from "react-redux";
import DocumentViewer from "./components/popups/DocumentViewer";
import FeedBackAndRating from "./components/popups/FeedBackAndRating";

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
