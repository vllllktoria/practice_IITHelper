import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import CreateEvents from "./pages/CreateEvents";
import Schedule from "./pages/Schedule";
import Students from "./pages/Students";
import AllEvents from "./pages/AllEvents";
import "./css/navbar.css";
import "./css/events.css";
import "./css/students.css";
import "./css/schedule.css";
import { ScheduleData, ScheduleContext } from './context/schedule.js';

function App() {

  console.log("cookie:", document.cookie);
  return (
    <ScheduleContext.Provider value={ScheduleData}>
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
            <>
              <Route path="/events" element={<CreateEvents />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/students" element={<Students />} />
              <Route path="/all" element={<AllEvents />} />
            </>
        </Routes>
      </BrowserRouter>
    </div>
    </ScheduleContext.Provider>
  );
}

export default App;
