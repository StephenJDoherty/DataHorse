import React, { useState } from "react";

const Habit = (habit) => {
  const defaultFormState = {
    name: habit.name,
    freq: habit.freq,
    qual: habit.qual,
  };

  const [formState, setFormState] = useState(defaultFormState);
  const [submittedEdit, setSubmittedEdit] = useState(defaultFormState);
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (event) => {
    console.log(event.target.name, event.target.value, formState);
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formState);
    setSubmittedEdit(formState);

    if (editMode) {
      setEditMode(false);
    } else {
      setEditMode(true);
    }
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
            <option id="neutral" value="neutral">
              {" "}
            </option>
            <option id="good" value="good">
              At least
            </option>
            <option id="bad" value="bad">
              No more than
            </option>
          </select>

          //Added
          useEffect(() => {
                if (habit && handleInputChange) {
                  setMySavedValue(habit)
                 }
            }, []);

          <input
            type="number"
            min="1"
            className="edit-input"
            name="freq"
            id="freq"
            value={formState.freq}
            onChange={handleInputChange}

           //Added 
           useEffect(() => {
                if (freq && handleInputChange) {
                  setMySavedValue(freq)
                 }
            }, []);

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

export default Habit;