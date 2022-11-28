import React, { useState } from "react";
import { auth } from "../firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

// create firestore object
const db = getFirestore();

const HabitEdit = (habit) => {
  const defaultFormState = {
    name: habit.name,
    freq: habit.freq,
    qual: habit.qual,
  };

  const [formState, setFormState] = useState(defaultFormState);
  const [submittedEdit, setSubmittedEdit] = useState(defaultFormState);
  const [editMode, setEditMode] = useState(false);
  const uid = auth.currentUser.uid;

  const handleInputChange = (event) => {
    console.log(event.target.name, event.target.value, formState);
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    setSubmittedEdit(formState);

    if (editMode) { //switch editMode to its opposite
      setEditMode(false);
    } else {
      setEditMode(true);
    }

    let docID = formState.name + "_" + uid;
    //update habit document with new qual and/or freq:
    await updateDoc(doc(db, "habits", docID), {
      qual: formState.qual.toString(),
      freq: formState.freq.toString(),
    });
  };

  return (
    <div className="HabitList">
      {editMode && (
        <form onSubmit={handleSubmit}>
          <button className="button" type="submit">
            ✏️
          </button>

          <button
            className="button"
            onClick={habit.handleDelete}
            value={habit.name}
          >
            🗑️
          </button>

          {submittedEdit.name}

          <input
            type="hidden"
            className="edit"
            name="name"
            id="name"
            value={habit.name}
            onChange={handleInputChange}
          />

          <select
            onChange={handleInputChange}
            name="qual"
            className="edit-input"
            value={formState.qual}
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
            className="edit-input"
            name="freq"
            id="freq"
            value={formState.freq}
            onChange={handleInputChange}
          />
          <span> time(s) per week</span>
        </form>
      )}

      {!editMode && ( //render non-editing version of habit:
        <div className="HabitList">
          <button className="button" onClick={handleSubmit}>
            ✏️
          </button>
          <button
            className="button"
            onClick={habit.handleDelete}
            value={habit.name}
          >
            🗑️
          </button>
          {submittedEdit.name}
          <span> </span>
          {submittedEdit.freq}
          {submittedEdit.qual === "good" && <span> (or more) </span>}
          {submittedEdit.qual === "bad" && <span> (or fewer) </span>}
          <span> time(s) per week</span>
        </div>
      )}
    </div>
  );
};

export default HabitEdit;
