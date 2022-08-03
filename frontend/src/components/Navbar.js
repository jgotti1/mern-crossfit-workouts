import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <div className="container">
        <Link to="/">My Crossfit Workouts</Link>
      </div>
    </header>
  );
}

export default Navbar;
