import React, { useState, Component } from "react";
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

  const handleSelect = () => {
    setMyEvents([
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        title: "hell yes!",
      },
    ]);
  };

  // todo: look at the props and find out how to click a day
  // and create an event by typing

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelect}
      />
    </div>
  );
};

export default MyCalendar;
