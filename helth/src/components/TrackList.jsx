import React, { useEffect, useState } from "react";

import "./HabitList.css";
import { auth } from "../firebase";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import TrackHabit from "./TrackHabit";

const db = getFirestore();

const TrackList = (props) => {
  const [dayMood, setDayMood] = useState(3);

  const uid = auth.currentUser.uid;

  //get strings for today's date and the number of the current week:
  const today = new Date();
  const dayStr = // "0000-00-00"  //just handy for testing, for now
    //this dayStr, below, is for "actual" use:
    today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
  const startDate = new Date(today.getFullYear(), 0, 1);
  const days = Math.floor((today - startDate) / (24 * 60 * 60 * 1000));
  const weekNum = Math.ceil(days / 7);

  useEffect(() => {
    handleSubmit().catch(console.error);
  }, []);

  //basically just update mood from neutral to whatever was logged:
  const handleSubmit = async (event) => {
    event.preventDefault();
    setDayMood(event.target.value);

    let docID = "week" + weekNum + "_" + uid;
    await setDoc(
      doc(db, "historyNice", docID),
      {
        [dayStr]: dayMood, // date: day's mood
      },
      { merge: true }
    ); //will create doc if DNE, update otherwise
  };

  const moodChangeHandler = (event) => {
    setDayMood(event.target.value);
  };

  return (
    <div className="HabitList">
      <h1>✨Dear diary, today I did stuff~✨</h1>
      <h3>Current goals:</h3>

      {props.list.map(
        (
          habit //maps over list of habits:
        ) => (
          <TrackHabit {...habit} handleSubmit={handleSubmit} />
        )
      )}

      <h3>And I feel...</h3>
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
