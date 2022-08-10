import React from "react";
import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { workoutFetchPath } from "../hooks/fetchPaths";
import { useAuthContext } from "../hooks/useAuthContext";

function Home() {
  const [workouts, setWorkouts] = useState(null);
  const [search, setSearch] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(workoutFetchPath, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      if (response.ok) {
        setWorkouts(json);
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search);
    const resultsArray = workouts.filter((workout) => workout.title.includes(search) || workout.details.includes(search));
    console.log(resultsArray);
    setWorkouts(resultsArray);

    return workouts;
  };

  const handleClear = (e) => {
    e.preventDefault();
    const fetchWorkouts = async () => {
      const response = await fetch(workoutFetchPath, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      if (response.ok) {
        setWorkouts(json);
      }
    };

    if (user) {
      fetchWorkouts();
    }
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <label className="search">
          Search Workouts...
          <input className="searchWorkouts" type="text" placeholder="? ? ?" onChange={(e) => setSearch(e.target.value)} />
          <span className="buttons_search">
            <button>Search</button>
            <button onClick={handleClear}>Clear Search</button>
          </span>
        </label>
      </form>

      <div className="home">
        <WorkoutForm />

        <div className="workouts">
          <h1 className="header_text">WORKOUTS</h1>
          {workouts && workouts.map((workout) => <WorkoutDetails key={workout._id} workout={workout} />)}
        </div>
      </div>
    </>
  );
}

export default Home;
