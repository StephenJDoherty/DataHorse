import React, { useState } from "react";
import HabitList from "../components/HabitList";

function HabitPage() {
  const [habitList, setHabitList] = useState([]);

  const handleAdd = (habitName, habitFreq, habitQual, editMode) => {
    if (habitList.filter((h) => h.name === habitName).length > 0) {
      handleDelete(habitName);
    } else if (habitName === "") {
      return;
    }

    setHabitList((prevHabitList) => {
      return [
        ...prevHabitList,
        { name: habitName, freq: habitFreq, qual: habitQual, shown: editMode },
      ];
    });
  };

  const handleDelete = (habitName) => {
    const habits = habitList.filter((h) => h.name !== habitName);
    setHabitList(habits);
  };

  return (
    <HabitList
      habits={habitList}
      onDelete={handleDelete}
      onAddHabit={handleAdd}
    />
  );
}

export default HabitPage;
