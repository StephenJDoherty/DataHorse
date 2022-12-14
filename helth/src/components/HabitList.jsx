import React, { useState } from "react";
import HabitEdit from "./HabitEdit";
import "./HabitList.css";
import { auth } from "../firebase";
import { deleteDoc, getFirestore, doc, setDoc } from "firebase/firestore";

// create firestore object
const db = getFirestore();

const HabitList = (props) => {
  //init everything to current state, but editMode defaults to false:
  const [newHabit, setNewHabit] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [newFreq, setNewFreq] = useState("");
  const [newQual, setNewQual] = useState("good");

  const uid = auth.currentUser.uid;
  const today = new Date();
  const dayStr =
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const startDate = new Date(today.getFullYear(), 0, 1);
  const days = Math.floor((today - startDate) / (24 * 60 * 60 * 1000));
  const weekNum = Math.ceil(days / 7);


  //add handler:
  const handleAdd = async (event) => {
    event.preventDefault();
    console.log(newHabit, newFreq, newQual);
    props.onAddHabit(newHabit, newFreq, newQual, editMode);

    if (newQual === "") {
      let newQual = "good";
    }
    setNewHabit("");
    setNewFreq("");
    setNewQual(newQual);
    setEditMode(false);

    //until I become a FireStore genius, each habit has its own document:
    let docID = newHabit + "_" + uid;
    //create a new doc for each habit added:
    await setDoc(doc(db, "habits", docID), {
      uid: uid,
      name: newHabit.toString(),
      qual: newQual.toString(),
      freq: newFreq,
    });
  };

  //delete handler:
  const handleDelete = async (event) => {
    props.onDelete(event.target.value);

    //grab the document in question + delete from DB:
    let docID = event.target.value + "_" + uid;
    let weekDocID = event.target.value+"_week"+weekNum+"_"+uid;
    await deleteDoc(doc(db, "habits", docID));
    await deleteDoc(doc(db, "currentWeek", weekDocID));
  };

  //these should all be ONE HANDLER TO RULE THEM ALL, but I can't make it work yet:
  const habitChangeHandler = (event) => {
    setNewHabit(event.target.value);
  };

  const freqChangeHandler = (event) => {
    setNewFreq(event.target.value);
  };

  const qualChangeHandler = (event) => {
    setNewQual(event.target.value);
  };

  return (
    <div className="HabitList">
      <h1>???My Habits???</h1>

      {props.list.length <= 0 && <h3>Add some habits to keep track of:</h3>}

      {props.list.length > 0 && (
        <div>
          <h3>Current goals:</h3>

          {props.list.map(
            (
              habit //maps over list of habits:
            ) => (
              <HabitEdit
                key={habit.name}
                {...habit}
                handleDelete={handleDelete}
              />
            )
          )}

          <h3>New goal:</h3>
        </div>
      )}
      <form className="Habit" onSubmit={handleAdd}>
        <input
          className="new-habit"
          type="text"
          placeholder="New Habit"
          id="habitname"
          value={newHabit}
          onChange={habitChangeHandler}
        />

        <select
          className="new-habit"
          onChange={qualChangeHandler}
          name="qual"
          value={newQual}
        >
          <option id="good" selected="true" value="good">
            At least
          </option>
          <option id="bad" value="bad">
            No more than
          </option>
        </select>

        <input
          type="number"
          min="1"
          className="new-habit"
          placeholder="Times per week"
          id="freq"
          value={newFreq}
          onChange={freqChangeHandler}
        />

        <input type="hidden" id="editing" value={editMode} />
        <button className="button" type="submit">
          ???
        </button>
      </form>
    </div>
  ); //return
}; //habitlist

export default HabitList;
