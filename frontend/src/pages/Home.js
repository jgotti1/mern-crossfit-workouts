import React from "react";
import { useEffect, useState } from "react";

function Home() {
  //dev fetch path
  const fetchPath = "/api/workouts";

  //prod fetch path to deploy from heroku
  // const fetchPath = "http://xxxxxxxxx/api/workouts"

  const [workouts, setWorkouts] = useState(null);
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();
      if (response.ok) {
        setWorkouts(json);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div>
      <div className="workouts">{workouts && workouts.map((workout) => <p key={workout._id}>{workout.title}</p>)}</div>
    </div>
  );
}

export default Home;
