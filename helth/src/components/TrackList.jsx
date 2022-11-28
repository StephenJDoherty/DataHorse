import React, { useEffect, useState } from "react";

import "./HabitList.css";
import { auth } from "../firebase";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import TrackHabit from "./TrackHabit";
import { Link } from "react-router-dom";

const db = getFirestore();

const TrackList = (props) => {
  const [dayMood, setDayMood] = useState(3);

  const uid = auth.currentUser.uid;

  //get strings for today's date and the number of the current week:
  const today = new Date();
  const dayStr =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  useEffect(() => {
    handleSubmit().catch(console.error);
  }, []);

  //basically just update mood from neutral to whatever was logged:
  const handleSubmit = async (event) => {
    event.preventDefault();
    setDayMood(event.target.value);

    await setDoc( //update day's mood in history collection:
      doc(db, "history", uid),
      {
        [dayStr]: dayMood,
      },
      { merge: true }
    ); //will create doc if DNE, otherwise update existing one

  };

  const moodChangeHandler = (event) => {
    setDayMood(event.target.value);
  };

  return (
    <div className="HabitList">
      <h1>✨Progress and mood for {dayStr}✨</h1>
      {props.list.length <= 0 && (
        <div>
          <h3>
            Not currently tracking any habits--
            <Link style={{ textDecoration: "none" }} to="/MyHabits">
              add some, here!
            </Link>
          </h3>
        </div>
      )}

      {props.list.length > 0 && (
        <div>
          <h3>I did...</h3>
          {props.list.map(
            (
              habit
            ) => ( //maps over list of habits:
              <TrackHabit {...habit} handleSubmit={handleSubmit} />
            )
          )}
        </div>
      )}

      <h3>And I feel:</h3>
      <form className="HabitList" onSubmit={handleSubmit}>
        <button className="button-face" value="5" onClick={moodChangeHandler}>
          😁
        </button>
        <button className="button-face" value="4" onClick={moodChangeHandler}>
          🙂
        </button>
        <button className="button-face" value="3" onClick={moodChangeHandler}>
          😐
        </button>
        <button className="button-face" value="2" onClick={moodChangeHandler}>
          ☹️
        </button>
        <button className="button-face" value="1" onClick={moodChangeHandler}>
          😭
        </button>
      </form>
    </div>
  );
};

export default TrackList;
