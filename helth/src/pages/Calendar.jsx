import React, { useState, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "../App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  const [myEvents, setMyEvents] = useState([
    {
      start: moment().toDate(),
      end: moment().add(1, "days").toDate(),
      title: "Some title",
    },
  ]);

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
      />
    </div>
  );
};

export default MyCalendar;
