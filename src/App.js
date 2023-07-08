import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"
import CreateEvents from "./pages/CreateEvents";
import Schedule from "./pages/Schedule";
import Students from "./pages/Students";
import Auth from "./pages/Auth";
import AllEvents from "./pages/AllEvents";
import "./css/navbar.css"
import "./css/events.css"
import "./css/students.css"
import "./css/auth.css"


function App(){ 
    return (
      <div>
        <BrowserRouter>
          <NavBar />
            <Routes>
              <Route path='/events' element={<CreateEvents />} />
              <Route path='/schedule' element={<Schedule />} />
              <Route path='/students' element={<Students />} />
              <Route path='/auth' element={<Auth />} />
              <Route path='/all' element={<AllEvents />} />
            </Routes>
         </BrowserRouter>
      </div>
    )
  }

export default App