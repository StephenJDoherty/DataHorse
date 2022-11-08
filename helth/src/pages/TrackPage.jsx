import React, { useEffect, useState } from "react";
import {
  collection,
  where,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import { auth } from "../firebase";
import TrackList from "../components/TrackList";

function TrackPage() {
  const [habitList, setHabitList] = useState([]);

  useEffect(() => {
    const getHabits = async () => {
      console.log("ue")
      //initialize empty array:
      let init = [];
      //get database + habits collection:
      const db = getFirestore();
      const colRef = collection(db, "habits");
      //query all docs where uid = current user's uid:
      const q = query(colRef, where
      ("uid", "==", auth.currentUser.uid));
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




  return (
    <TrackList
      habits={habitList}
    />
  );
}

export default TrackPage;
