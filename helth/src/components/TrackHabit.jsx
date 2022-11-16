import React, {useState} from "react";
import {auth} from "../firebase";
import {collection, doc, getDocs, getFirestore, query, setDoc, where} from "firebase/firestore";

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
    const uid = auth.currentUser.uid;


    //get strings for today's date and the number of the current week:
    const today = new Date();
    const dayStr = // "0000-00-00"  //just handy for testing, for now
        //this dayStr, below, is for "actual" use:
        today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
    const startDate = new Date(today.getFullYear(), 0, 1);
    const days = Math.floor((today - startDate) / (24 * 60 * 60 * 1000));
    const weekNum = Math.ceil(days / 7);


    //function to grab num of times user has already completed a habit:
    const getTimesThisWeek = async () => {
        let t = 0;
        //get database + historyMess collection:
        const db = getFirestore();
        const colRef = collection(db, "historyMess");
        //query all docs where uid = current user's uid && habit = this habit:
        const q = query(colRef, where
            ("uid", "==", auth.currentUser.uid),
            where("habit", "==", habit.name));
        //take snapshot of docs returned by query:
        const snapShot = await getDocs(q);
        // get and return current count of times this habit was done this week:
        snapShot.forEach((doc) => {
            t += parseInt(doc.get("timesThisWeek"));
        });
        console.log("t = ", t);
        return t;
    }


    //function to calculate score:
    const getWeekScore = async () => {
        let docNum = 0; //init vars
        let ratioSum = 0;

        //same code as in getTimesThisWeek, more or less:
        const colRef = collection(db, "historyMess");
        const q = query(
            colRef,
            where("uid", "==", auth.currentUser.uid),
            where("week", "==", weekNum)
        );
        const snapShot = await getDocs(q);
        snapShot.forEach((doc) => {
            docNum++; //count number of a week's habits
            //add up score (ratio) for each habit:
            ratioSum += parseFloat(doc.get("weekRatio"));
            console.log("added ", ratioSum);
        });
        return (ratioSum / docNum); //score = average of ratios
    }


    const handleInputChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmittedEdit(formState);

        //new times this week = the ttw pulled from the doc + times today:
        let ttw = ((await getTimesThisWeek()) + parseInt(formState.times));
        console.log(ttw);

        //calculate weekly performance ratio of this habit:
        let ratio = ttw / habit.freq;
        if (habit.qual === "bad") {
            ratio *= -1;  //bad habits -> negative points
        }
        if (ttw === 0) { //just in case
            ratio = 0;
        }
        console.log("ratio: ", ratio);


        //create or update document with too much information:
        let docID = habit.name + "_week" + weekNum + "_" + uid;
        await setDoc(doc(db, "historyMess", docID), {
            uid: uid,
            habit: habit.name,
            targetWeeklyFreq: habit.freq,
            qual: habit.qual,
            timesToday: formState.times,
            timesThisWeek: ttw,
            date: dayStr.toString(),
            weekRatio: ratio,
            week: weekNum,
        });


        let score = await getWeekScore();
        //initialize a doc in HistoryNice
        let niceID = "week" + weekNum + "_" + uid;
        await setDoc(doc(db, "historyNice", niceID), {
                uid: uid,
                week: weekNum,
                weekScore: score,
                [dayStr]: 3 // date: day's mood (inits to default neutral mood score)
            },
            {merge: true});

    };

    return (
        <div className="habit-name">
            <form onSubmit={handleSubmit}>
             <div>  <span> ● </span>

                {submittedEdit.name}:

                <input
                    type="number"
                    min="1"
                    className="log-input"
                    name="times"
                    id="times"
                    placeholder={formState.times}
                    value={formState.times}
                    onChange={handleInputChange}
                />

                <span> time(s) today</span>
                <button className="button" type="submit">
                    ✔️
                </button>
             </div>
            </form>
        </div>
    );
};

export default TrackHabit;
