import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"
import Events from "./pages/Events";
import Schedule from "./pages/Schedule";
import Students from "./pages/Students";
import "./css/navbar.css"

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/events' exact component={Events} />
        <Route path='/schedule' component={Schedule} />
        <Route path='/students' component={Students} />
      </Routes>
    </BrowserRouter>
    )
  }
}

export default App