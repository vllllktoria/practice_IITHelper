import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import CreateEvents from "./pages/CreateEvents";
import Schedule from "./pages/Schedule";
import Students from "./pages/Students";
import Auth from "./pages/Auth";
import AllEvents from "./pages/AllEvents";
import "./css/navbar.css";
import "./css/events.css";
import "./css/students.css";
import "./css/auth.css";
import "./css/schedule.css";

function App() {
  //const [isAuthorized, setIsAuthorized] = useState(false);

/*   useEffect(() => {
    const sessionToken = getCookie("session-token");
    if (sessionToken) {
      setIsAuthorized(true);
    }
  }, []); */
/* 
  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const [cookieName, cookieValue] = cookies[i].split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }; */

  console.log("cookie:", document.cookie);
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* {isAuthorized ? ( */}
            <>
              <Route path="/events" element={<CreateEvents />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/students" element={<Students />} />
              <Route path="/all" element={<AllEvents />} />
              <Route path="/auth" element={<Auth />} />
            </>{/* 
          ) : (
            <Route path="/auth" element={<Auth />} />
          )}
          <Route path="/" element={<Navigate to={isAuthorized ? "/events" : "/auth"} />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
