import React from "react";
import { Link } from "react-router-dom";
import "./HabitList.css";

function Navbar() {
  return (
    <nav className="Habit">
      <ul
        style={{
          display: "inline-flex",
          listStyle: "none",
          marginBottom: "0",
          paddingLeft: "0",
        }}
      >
        <li className>
          <Link style={{ textDecoration: "none", fontSize: "45px" }} to="/">
            ⚕️
          </Link>
        </li>
        <li className="new-habit">
          <Link style={{ textDecoration: "none" }} to="/">
            Home
          </Link>
        </li>
        <li className="new-habit">
          <Link style={{ textDecoration: "none" }} to="/Calendar">
            Calendar
          </Link>
        </li>
        <li className="new-habit">
          <Link style={{ textDecoration: "none" }} to="/MyHabits">
            My Habits
          </Link>
        </li>
        <li className="new-habit">
          <Link style={{ textDecoration: "none" }} to="/TrackDay">
            Track Today
          </Link>
        </li>
        <li className="new-habit">
          <Link style={{ textDecoration: "none" }}
                to="/">
            Log out

            {/*TODO I think this would be nice, but am not sure how to make it work*/}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
