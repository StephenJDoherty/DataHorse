import React, { useEffect, useState } from "react";
import {
  collection,
  where,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import { auth } from "../firebase";

function HabitPage(props) {
  console.log("props = ", props);
  const [list, setList] = useState([]);

  useEffect(() => {
    const getHabits = async () => {
      console.log("ue");
      //initialize empty array:
      let init = [];
      //get DB + habits collection:
      const db = getFirestore();
      const colRef = collection(db, props.collectionPath);
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
      console.log("props component", props.Component);
      console.log("init", init);
      setList(init);
    }; // end of getHabits
    getHabits().catch(console.error);
  }, []); //end of useEffect

  const handleAdd = (name, freq, quality, editMode) => {
    if (list.filter((h) => h.name === name).length > 0) {
      handleDelete(name);
    } else if (name === "") {
      return;
    } else if (list.filter((h) => h.name === name).length > 0) {
      handleDelete(name);
    }

    setList((prevList) => {
      return [
        ...prevList,
        { name: name, freq: freq, qual: quality, shown: editMode },
      ];
    });
  };

  const handleDelete = (name) => {
    const filteredHabits = list.filter((h) => h.name !== name);
    setList(filteredHabits);
    return list;
  };

  return (
    <props.Component
      list={list}
      onDelete={handleDelete}
      onAddHabit={handleAdd}
    />
  );
}

export default HabitPage;
