import React from "react";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

//date-fns formating date
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function WorkoutDetails({ workout }) {
  //dev fetch path
  const fetchPath = "http://localhost:4000/api/workouts/";

  //prod fetch path to deploy from heroku
  // const fetchPath = "http://xxxxxxxxx/api/workouts/"

  //Delete workout handling
  const handleDelete = async () => {
    const response = await fetch(fetchPath + workout._id, {
      method: "DELETE",
    });

    if (response.ok) {
      window.location.reload(false);
    }
  };

  //Handle Edit of workouts
  const navigate = useNavigate();

  const HandleEdit = async () => {
    const response = await fetch(fetchPath + workout._id, {
      method: "Get",
    });
    const editWorkout = await response.json();

    if (response.ok) {
      navigate("/edit", { state: editWorkout });
    }
  };
  return (
    <div>
      <div className="workout-details">
        <span>
          <GrEdit className="icons" onClick={HandleEdit} />
          <RiDeleteBin2Line className="icons" onClick={handleDelete} />
        </span>
        <h4>{workout.title}</h4>
        <p>
          <strong>Workout Type: </strong>
          {workout.workoutType}
        </p>
        <p>
          <strong> Time</strong> <em>(for timed wods): </em> {workout.time + ":00"}
        </p>
        <p>
          <strong>Details: </strong>
          {workout.details}
        </p>
        <p>
          <strong>RX or Scaled: </strong>
          {workout.rx}
        </p>
        <p>
          <strong>Results: </strong>
          {workout.results}
        </p>
        <p>
          <strong>created: </strong>
          {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}

export default WorkoutDetails;
