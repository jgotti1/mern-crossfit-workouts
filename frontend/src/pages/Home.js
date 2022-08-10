import React from "react";
import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { workoutFetchPath } from "../hooks/fetchPaths";
import { useAuthContext } from "../hooks/useAuthContext";

function Home() {
  const [workouts, setWorkouts] = useState(null);
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

  return (
    <>
      <div className="home">
        <WorkoutForm />
        <div className="workouts">{workouts && workouts.map((workout) => <WorkoutDetails key={workout._id} workout={workout} />)}</div>
      </div>
    </>
  );
}

export default Home;
