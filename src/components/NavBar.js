import React from 'react';
import {  Link } from "react-router-dom";

class NavBar extends React.Component{
    render() {
        return (
            <header className ="header">
                <div className = "main">
                    <ul className ="navbar">
			            <li><Link to="/events">События</Link></li>
                        <li><Link to="/schedule">Расписание</Link></li>
                        <li><Link to="/students">Студенты</Link></li>
		            </ul>
                </div>
		        <div className = "right">
                    <ul className ="navbar">
                        <li><Link to="/auth">Выход</Link></li>
		            </ul>
                </div>   
            </header>
        )
    }
}
    
export default NavBar