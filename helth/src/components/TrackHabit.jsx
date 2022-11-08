import React, { useState } from "react";
import { auth } from "../firebase";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const db = getFirestore();

const TrackHabit = (habit) => {
  const defaultFormState = {
    name: habit.name,
    freq: habit.freq,
    qual: habit.qual,
    times: habit.times,
  };

  const [formState, setFormState] = useState(defaultFormState);
  const [submittedEdit, setSubmittedEdit] = useState(defaultFormState);
  const [trackMode, setTrackMode] = useState(false);
  const uid = auth.currentUser.uid;

  const today = new Date();
  const dayStr =
    today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
  const startDate = new Date(today.getFullYear(), 0, 1);
  const days = Math.floor((today - startDate) / (24 * 60 * 60 * 1000));
  const weekNum = Math.ceil(days / 7);

  const handleInputChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmittedEdit(formState);

    if (trackMode) {
      setTrackMode(false);
    } else {
      setTrackMode(true);
    }

    let ratio;
    if (habit.qual === "good") {
      ratio = formState.times / habit.freq;
    } else {
      ratio = habit.freq / formState.times;
    }

    let docID = habit.name + "_week" + weekNum + "_" + uid;
    await setDoc(doc(db, "historyMess", docID), {
      uid: uid,
      targetFreq: habit.freq,
      qual: habit.qual,
      times: formState.times,
      date: dayStr.toString(),
      ratio: ratio,
      week: weekNum,
    });
  };

  return (
    <div className="HabitList">
      <form onSubmit={handleSubmit}>
        <button className="button" type="submit">
          ✔️
        </button>

        {submittedEdit.name}

        <input
          type="number"
          min="1"
          className="log-input"
          name="times"
          id="times"
          placeholder={"weekly goal: " + habit.freq}
          value={formState.times}
          onChange={handleInputChange}
        />

        <span> time(s) today</span>
      </form>
    </div>
  );
};

export default TrackHabit;
