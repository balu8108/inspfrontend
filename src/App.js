import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import { isAuthenticated } from "./utils";

const ProtectedRoutes = () => {
  const isAuth = isAuthenticated();
  if (!isAuth) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

function App() {
  const location = useLocation();

  const isNavbarDisabled =
    location.pathname === "/" || location.pathname.startsWith("/auth");

  return (
    <>
      {!isNavbarDisabled && <Navbar />}

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
