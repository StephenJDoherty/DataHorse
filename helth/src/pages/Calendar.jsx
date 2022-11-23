import React, { useState, useCallback, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth } from "../firebase";

import "../App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const db = getFirestore();

const MyCalendar = (props) => {
  // can do a map to myEvents for all the stuff in historyNice based on the date

  const [myEvents, setMyEvents] = useState([
    {
      start: "",
      end: "",
      title: "",
      mood: "",
    },
  ]);

  // connect to the database and pull data into the calendar based
  // on the dates that have habit history

  // useEffect(() => {
  //   console.log("here 2");
  //   const uid = auth.currentUser.uid;
  //   // run one time, when page is rendered
  //   // want to getDoc for the historyNice table and
  //   // for the rating 1-5 show the smiling face emoji associated, also
  //   // make the comment green if 5/4, yellow if 3/2 and red if 1 (5 highest)
  //   // need the historyNice to include the date when set
  //   // question what is a score good/bad?

  //   const today = new Date(); // format this to match what we are saving
  //   const scoreMood = collection(db, "emoji");
  //   const query = query(scoreMood, where("uid", "==", uid));

  //   // create the object array where the date matches and then call SetMyEvents
  //   // map thru the events and create an object with start, end, and score/ mood emoji

  //   const dailyRating = getDocs(query);
  //   const eventHistory = [];
  //   dailyRating.forEach((doc) => {
  //     console.log("here 3");
  //     let mood = doc.get("mood");
  //     let date = doc.get("date");
  //     let dateMoment = moment(date);
  //     // push this mood eventhistory array
  //     eventHistory.push({
  //       start: dateMoment,
  //       end: moment().add(1, "days").toDate(),
  //       title: mood,
  //     });
  //   });

  //   setMyEvents(eventHistory);
  //   console.log("My eventhistory: ", eventHistory);
  //   console.log("my events: ", myEvents);
  // }, []);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt("New Event name");
      if (title) {
        setMyEvents((prev) => [...prev, { start, end, title }]);
      }
    },
    [setMyEvents]
  );

  const deleteEvent = (deleted) => {
    const confirm = window.confirm("Would you like to delete this event?");
    if (confirm) {
      setMyEvents(
        myEvents.filter((item) => {
          return item !== deleted;
        })
      );
    }
  };

  const eventStyleGetter = () => {
    let backgroundColor = "blue";
    let score = ""; // need to get the score locally here
    // update these scores to match whats desired
    if (score > 50) {
      backgroundColor = "red";
    } else if (score < 50) {
      backgroundColor = "yellow";
    } else {
      backgroundColor = "green";
    }
    let style = {
      backgroundColor: backgroundColor,
    };
    return {
      style: style,
    };
  };

  return (
    <div>
      <Calendar
        selectable
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 800 }}
        onSelectEvent={deleteEvent}
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default MyCalendar;
