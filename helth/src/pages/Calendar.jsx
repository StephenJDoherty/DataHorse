import React, {useCallback, useEffect, useState} from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "../components/HabitList.css";

import "../App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import {auth} from "../firebase";

const db = getFirestore();
const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
    const [myEvents, setMyEvents] = useState([
        {
            start: "",
            end: "",
            title: "",
            mood: "",
        },
    ]);


    const [data, setData] = useState([]);

    const getDates = () => {
        //creates an array of all dates in the current month
        const year = now.getFullYear();
        const month = now.getMonth();
        const date = new Date(year, month, 1);
        const dates = [];
        while (date.getMonth() === month) {
            //push date and a 0 (mood initializer) to list:
            dates.push(
                date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
                + date.getDate(), "0",
            )
            date.setDate(date.getDate() + 1);
        }
        return dates;
    }

    const now = new Date();
    const dates = getDates((now.getFullYear(), now.getMonth()));


    const getData = async (dates) => {
        let init = [];
        for (let i = 0; i < dates.length; i++) {
            let d8 = dates[i].toString();
            const colRef = collection(db, "history");
            //query docs where uid = current user's uid
            const q = query(
                colRef,
                where("uid", "==", auth.currentUser.uid));
            const snapShot = await getDocs(q);
            snapShot.forEach((doc) => {
                let mood = doc.get(d8);
                if (mood > 0) {
                    init.push({d8, mood,})
                }
            });//end of forEach
        }//end of dates loop
         //data = array of [date, mood] pairs:
        setData(init);
    }


    useEffect(() => {
        getData(dates).then(r => console.log("got dates"))
    }, []); //end of useEffect


    const handleSelectSlot = useCallback(
        ({start, end}) => {
            const title = window.prompt("New Event name");
            if (title) {
                setMyEvents((prev) => [...prev, {start, end, title}]);
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
        let backgroundColor = "lightblue";
        let style = {
            backgroundColor: backgroundColor,
        };
        return {
            style: style,
        };
    };


    const calendarStyle = (date) => {

        for (let i = 0; i < data.length; i++) {
            let dataDate = data[i].d8;
            let allDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

            if (allDate === dataDate) {
                return {
                    style: {
                        backgroundColor: 'yellow',
                        dateStyle: "sdfs",
                        // border: '1px solid gray',
                        margin: 0,
                        padding: 0,
                        // TODO I WANT A PICTURE OR LARGE EMOJI TEXT HERE SO BADDDDD
                    },
                }
            }
        }
    }

    return (
        <div>
            <img src ="cal02.png"
                 width={'100%'}
                 height={'100%'}/>
            {/*<Calendar*/}

            {/*    selectable*/}
            {/*    localizer={localizer}*/}
            {/*    events={myEvents}*/}
            {/*    startAccessor="start"*/}
            {/*    endAccessor="end"*/}
            {/*    style={{height: 800}}*/}
            {/*    onSelectEvent={deleteEvent}*/}
            {/*    dayPropGetter={calendarStyle}*/}
            {/*    onSelectSlot={handleSelectSlot}*/}
            {/*    eventPropGetter={eventStyleGetter}*/}

            {/*/>*/}
        </div>
    );
};

export default MyCalendar;
