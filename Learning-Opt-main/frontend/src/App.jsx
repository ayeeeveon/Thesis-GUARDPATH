import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Map from "./pages/Map";
import History from "./pages/History";

// SIMPLE AUTH CHECK USING LOCALSTORAGE
function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

const App = () => (
  <Router>
    <Routes>

      {/* First page: Home (PUBLIC) */}
      <Route path="/" element={<Home />} />

      {/* Login Page */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected: Map */}
      <Route
        path="/map"
        element={
          <PrivateRoute>
            <Map />
          </PrivateRoute>
        }
      />
      <Route
        path="/history"
        element={
          <PrivateRoute>
            <History />
          </PrivateRoute>
        }
      />
      {/* Redirect any unknown URL to home */}
      <Route path="*" element={<Navigate to="/map" />} />

    </Routes>
  </Router>
);

export default App;
