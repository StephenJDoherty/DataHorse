import React, { useEffect, useState } from "react";

import "./HabitList.css";
import { auth } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import TrackHabit from "./TrackHabit";

const db = getFirestore();

const TrackList = (props) => {
  const [dayMood, setDayMood] = useState(3);

  const uid = auth.currentUser.uid;

  const today = new Date();
  let startDate = new Date(today.getFullYear(), 0, 1);
  let days = Math.floor((today - startDate) / (24 * 60 * 60 * 1000));
  let weekNum = Math.ceil(days / 7);

  useEffect(() => {
    handleSubmit().catch(console.error);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDayMood(event.target.value);
    console.log(dayMood);

    let docNum = 0;
    let ratioSum = 0;

    const colRef = collection(db, "historyMess");
    const q = query(
      colRef,
      where("uid", "==", auth.currentUser.uid),
      where("week", "==", weekNum)
    );
    const snapShot = await getDocs(q);
    snapShot.forEach((doc) => {
      docNum++;
      ratioSum += doc.get("ratio");
    }); //end of forEach

    let docID = "week" + weekNum + "_" + uid;

    await setDoc(doc(db, "historyNice", docID), {
      uid: uid,
      score: ratioSum / docNum,
      mood: dayMood,
    });
  };

  const moodChangeHandler = (event) => {
    setDayMood(event.target.value);
  };

  return (
    <div className="HabitList">
      <h1>✨Dear diary, today I did stuff~✨</h1>
      <h3>Current goals:</h3>

      {props.habits.map(
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
