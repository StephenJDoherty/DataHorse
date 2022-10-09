import React, { useState } from "react";
import Habit from "./Habit";
import "./HabitList.css";

const HabitList = (props) => {
  //init everything to current state, but editMode defaults to false:
  const [newHabit, setNewHabit] = useState("");
  const [habitList, setHabitList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [newFreq, setNewFreq] = useState("");
  const [newQual, setNewQual] = useState("");

  //add handler:
  const handleAdd = (event) => {
    event.preventDefault();
    console.log(newHabit, newFreq, newQual);
    props.onAddHabit(newHabit, newFreq, newQual, editMode);
    setNewHabit("");
    setNewFreq("");
    setNewQual("");
    setEditMode(false);
  };

  //delete handler:
  const handleDelete = (event) => {
    props.onDelete(event.target.value);
    const habits = habitList.filter((c) => c.name !== event.target.value);
    setHabitList(habits);
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
      <h1>Someday I'll be a ✨list of habits✨</h1>
      <h3>Current goals:</h3>

      {props.habits.map(
        (
          habit //maps over list of habits:
        ) => (
          <Habit {...habit} handleDelete={handleDelete} />
        )
      )}

      {/* form to add a new goal :*/}
      <h3>New goal:</h3>
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
          <option id="neutral" value="neutral">
            Exactly
          </option>
          <option id="good" value="good">
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
          ➕
        </button>
      </form>
    </div>
  ); //return
}; //habitlist

export default HabitList;
