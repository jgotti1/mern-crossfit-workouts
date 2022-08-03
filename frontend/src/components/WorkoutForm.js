import React from "react";
import { useState } from "react";

export default function WorkoutForm() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [details, setDetails] = useState("");
  const [results, setResults] = useState("");
  const [error, setError] = useState(null);
  const [rx, setRx] = useState("");

  //dev fetch path
  const fetchPath = "http://localhost:4000/api/workouts/";

  //prod fetch path to deploy from heroku
  // const fetchPath = "http://xxxxxxxxx/api/workouts/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, time, workoutType, details, results, rx };
    const response = await fetch(fetchPath, {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle("");
      setTime("");
      setWorkoutType("");
      setDetails("");
      setResults("");
      setRx("");
      setError(null);
      console.log("Workout Added", json);
      window.location.reload(false);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3 className="workout_header">Add New Workout</h3>
      <h5 className="required">* required field</h5>

      <label>* Workout Title: </label>
      <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
      <label htmlFor="workoutType">* Workout Type: </label>
      <select onChange={(e) => setWorkoutType(e.target.value)} value={workoutType}>
        <option value=""></option>
        <option value="AMRAP">AMRAP</option>
        <option value="EMOM">EMOM</option>
        <option value="FOR TIME">FOR TIME</option>
        <option value="FOR REPS">FOR REPS</option>
        <option value="Other">OTHER</option>
      </select>
      <label>Workout Length (when applicable): </label>
      <input type="number" step="1" onChange={(e) => setTime(e.target.value)} value={time} />
      <label>* Workout Details: </label>
      <textarea type="text" rows="7" cols="40" onChange={(e) => setDetails(e.target.value)} value={details} />
      <label>Results: </label>
      <input type="text" onChange={(e) => setResults(e.target.value)} value={results} />
      <label>RX or Scaled: </label>
      <select onChange={(e) => setRx(e.target.value)} value={rx}>
        <option value=""></option>
        <option value="RX">RX</option>
        <option value="Scaled">Scaled</option>
      </select>
      <br />
      <br />
      <button>Add Workout</button>
      {error && <div className="error"> {error}</div>}
    </form>
  );
}
