import React, { useEffect, useState } from "react";
import HabitList from "../components/HabitList";
import {
  collection,
  where,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import { auth } from "../firebase";

function HabitPage() {
  const [habitList, setHabitList] = useState([]);

  useEffect(() => {
    const getHabits = async () => {
      //initialize empty array:
      let init = [];
      //get database + habits collection:
      const db = getFirestore();
      const colRef = collection(db, "habits");
      //query all docs where uid = current user's uid:
      const q = query(colRef, where("uid", "==", auth.currentUser.uid));
      //take snapshot of docs returned by query:
      const snapShot = await getDocs(q);
      //for each doc in the snapshot, grab the attributes...
      snapShot.forEach((doc) => {
        let name = doc.get("name");
        let qual = doc.get("qual");
        let freq = doc.get("freq");
        //push the "habits" to the init array:
        init.push({ name, qual, freq });
      }); //end of forEach
      //setHabitList to init:
      setHabitList(init);
    }; // end of getHabits
    getHabits().catch(console.error);
  }, []); //end of useEffect

  const handleAdd = (habitName, habitFreq, habitQual, editMode) => {
    if (habitList.filter((h) => h.name === habitName).length > 0) {
      handleDelete(habitName);
    } else if (habitName === "") {
      return;
    } else if (habitList.filter((h) => h.name === habitName).length > 0) {
      handleDelete(habitName);
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
    return habitList;
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
