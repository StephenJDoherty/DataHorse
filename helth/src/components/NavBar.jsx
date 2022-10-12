import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Calendar">Calendar</Link>
        </li>
        <li>
          <Link to="/HabitPage">My Habits</Link>
        </li>

      </ul>
    </nav>
  );
}

export default Navbar;
