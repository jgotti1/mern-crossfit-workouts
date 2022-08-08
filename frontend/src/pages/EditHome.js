import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { workoutFetchPath } from "../hooks/fetchPaths";
import { useAuthContext } from "../hooks/useAuthContext";

//date-fns formating date
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function EditHome() {
  //Get state of the selected object to edit from useLocation()
  const { state } = useLocation();
  const [title, setTitle] = useState(state.title);
  const [time, setTime] = useState(state.time);
  const [workoutType, setWorkoutType] = useState(state.workoutType);
  const [details, setDetails] = useState(state.details);
  const [results, setResults] = useState(state.results);
  const [error, setError] = useState(null);
  const [rx, setRx] = useState(state.rx);
  const { user } = useAuthContext();

  //Handle "Patch of workout changes"
  const navigate = useNavigate();
  console.log(state);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }
    const workout = { title, time, workoutType, details, results, rx };

    const response = await fetch(workoutFetchPath + state._id, {
      method: "PATCH",
      body: JSON.stringify(workout),
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      navigate("/");
    }
  };

  return (
    <div className="home_edit">
      {/* workout selected section */}

      <div className="workout-edit">
        <div>
          <h2 className="edit_head">EDIT WORKOUT</h2>
        </div>
        <h4>{state.title}</h4>
        <p>
          <strong>Workout Type: </strong>
          {state.workoutType}
        </p>
        <p>
          <strong> Time</strong> <em>(for timed wods): </em> {state.time + ":00"}
        </p>
        <p>
          <strong>Details: </strong>
          {state.details}
        </p>
        <p>
          <strong>RX or Scaled: </strong>
          {state.rx}
        </p>
        <p>
          <strong>Results: </strong>
          {state.results}
        </p>
        <p>
          <strong>created: </strong>
          {formatDistanceToNow(new Date(state.createdAt), { addSuffix: true })}
        </p>
      </div>

      {/* Form section */}
      <form className="create" onSubmit={handleEdit}>
        <h3 className="workout_header">Edit Workout</h3>
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
        <textarea type="text" rows="7" cols="35" onChange={(e) => setDetails(e.target.value)} value={details} />
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
        <button>Submit Edit(s)</button>
        {error && <div className="error"> {error}</div>}
      </form>
    </div>
  );
}

export default EditHome;
