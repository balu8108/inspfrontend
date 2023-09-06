import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import routes from "./routes";

function App() {
  const location = useLocation();

  const isNavbarDisabled =
    location.pathname === "/" || location.pathname.startsWith("/auth");

  return (
    <>
      {!isNavbarDisabled && <Navbar />}

      <Routes>
        {routes.map((route) => {
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
