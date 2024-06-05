import moment from "moment";
import myDate, { compareDays } from "../utils/myDate.cjs";
import "../Calendar.css"
import { useContext, useEffect } from "react";
import Fetcher from "../fetcher";
import { useState } from "react";
import MyButton from './buttons/MyButton';
import ToggleButton from "./buttons/ToggleButton";
import CreateSession from "./CreateSessionForm";
import myString from "../utils/myString.cjs";
import { Detail, getReservationDetails } from './ReservationCard.jsx';
import { getSessionDetails } from './MySession.jsx';
import { UserContext } from "./UserProvider.jsx";
import BookButton from "./buttons/BookButton.jsx";

const fetcher = new Fetcher("api/users/calendar");
const alphaHex = "7c"; // "d0";
const colors = {
  unavailable: "#000000" + alphaHex,
  available: "#c4bb97" + alphaHex,
  reservation: "#5ca904" + alphaHex,
  // reservation: "#2a4a1c" + alphaHex,
  session: "#6b9fdb" + alphaHex,
}

const daysOfTheMonth = (date) => {
  const month = date.getMonth();
  const result = [];
  let checkDate = new Date(date);

  // add today + rest of the days of the month
  while (checkDate.getMonth() === month) {
    result.push(new Date(checkDate));
    checkDate.setDate(checkDate.getDate() + 1);
  }
  // fill out last week
  const nextMonthFirstDay = checkDate.getDay();
  if (nextMonthFirstDay > 0) {
    while (checkDate.getDay() >= nextMonthFirstDay) {
      result.push(new Date(checkDate));
      checkDate.setDate(checkDate.getDate() + 1);
    }
  }

  // add previous days of the month + fill out the first week
  checkDate = new Date(date);
  checkDate.setDate(checkDate.getDate() - 1);
  while (checkDate.getMonth() === month) {
    result.unshift(new Date(checkDate));
    checkDate.setDate(checkDate.getDate() - 1);
  }

  // fill out first week
  const prevMonthLastDay = checkDate.getDay();
  if (prevMonthLastDay < 6) {
    while (checkDate.getDay() <= prevMonthLastDay) {
      result.unshift(new Date(checkDate));
      checkDate.setDate(checkDate.getDate() - 1);
    }
  }

  return result;
}

// <-- Main Component -->
const Calendar = ({ user: forUser }) => {
  const { user } = useContext(UserContext);
  const [displayUser, setDisplayUser] = useState(null);
  const [currDisplay, setCurrDisplay] = useState("Month");
  const [viewDate, setViewDate] = useState(new Date());
  const toggleAdding = useState(false);
  const isAdding = toggleAdding[0];
  const [formDefault, setFormDefault] = useState({});

  const gridW = 7;
  // const isMyCalendar = user && user.id === displayUser?.id;
  const isMyCalendar = !displayUser || user?.id === displayUser.id;

  const fetchDisplayUser = () => {
    if (forUser?.id) {
      fetcher.route(forUser.id.toString()).get(setDisplayUser);
    }
  }

  useEffect(() => {
    if (!displayUser) {
      fetchDisplayUser();
    }
  }, [forUser])

  const toCellPos = (index) => {
    return [Math.floor(index / gridW) + 1, index % gridW + 1];
  }

  const cellStyle = (index) => {
    const cellPos = toCellPos(index);
    return {
      gridRow: `${cellPos[0]} / ${cellPos[0] + 1}`,
      gridColumn: `${cellPos[1]} / ${cellPos[1] + 1}`,
    };
  }

  const getDayIdx = (checkDate) => {
    return calendarMonthData.findIndex(({ date }) => myDate.areSameDay(date, checkDate));
  }

  const incrementDate = (byNum) => {
    switch (currDisplay) {
      case "Agenda":
      case "Day":
        byNum = byNum < 0 ? -1 : 1;
        let newDate = null;
        const startIdx = byNum > 0 ? allEvents.length - 1 : 0;
        for (let i = startIdx; i >= 0 && i < allEvents.length; i -= byNum) {
          if (myDate.compareDays(allEvents[i].when_start, viewDate) * byNum > 0) {
            newDate = allEvents[i].when_start;
          } else break;
        }
        if (newDate) setViewDate(new Date(newDate));
        break;
      case "Month":
        setViewDate((prevDate) => {
          const newDate = new Date(prevDate);
          newDate.setMonth(prevDate.getMonth() + byNum);
          return newDate;
        });
        break;
    }
  }

  // combine sessions and reservations into more versatile "event"
  const allEvents = [];
  const allSessions = displayUser?.services.reduce((acc, srvc) => {
    if (!Array.isArray(srvc.sessions)) return acc;

    acc.push(...srvc.sessions.map(sess => {
      return {
        when_start: sess.when_start,
        duration_min: sess.duration_min,
        service: srvc,
        session: sess,
      }
    }));
    return acc;
  }, []);
  if (Array.isArray(allSessions)) allEvents.push(...allSessions);

  if (isMyCalendar && Array.isArray(displayUser?.reservations)) {
    allEvents.push(...displayUser.reservations.map(rsvp => {
      const session = rsvp.session;
      return {
        when_start: session?.when_start,
        duration_min: session?.duration_min,
        service: session?.service,
        reservation: rsvp,
      }
    }));
  }

  allEvents.sort((a, b) => new Date(a.when_start) - new Date(b.when_start));

  const calendarMonthData = daysOfTheMonth(viewDate).map((e, i) => { return { index: i, date: e, events: [], reservations: [], sessions: [] } });

  // add events to their respective days in the current month
  allEvents.forEach(event => {
    const dayIndex = getDayIdx(event.when_start);
    if (dayIndex >= 0) {
      calendarMonthData[dayIndex].events.push(event);
      if (event.hasOwnProperty("reservation"))
        calendarMonthData[dayIndex].reservations.push(event.reservation);
      if (event.hasOwnProperty("session"))
        calendarMonthData[dayIndex].sessions.push(event.session);
    }
  })

  const CellContents = ({ data }) => {
    return <div className="flex flex-col justify-start" style={{ ...cellStyle(gridW + data.index) }}>
      {data.date.getDate()}
      {["sessions", "reservations"].map(e => {
        const singular = e.slice(0, -1);
        return <div className="calendar-cell-line" style={{ backgroundColor: colors[singular], opacity: data[e].length > 0 ? 1 : 0 }}>
          {`${data[e].length} ${myString.capitalize(data[e].length === 1 ? singular : e)}`}
        </div>
      })}
    </div>
  }

  const isClickable = (i) => {
    if (i < 0 || i > calendarMonthData.length) return false;
    if (isAdding) return true;
    return calendarMonthData[i].reservations.length > 0 || calendarMonthData[i].sessions.length > 0;
  }

  const onClickCell = (e, i) => {
    const clickedDate = calendarMonthData[i]?.date;

    if (isAdding) {
      setFormDefault((prev) => {
        return {
          ...prev,
          date: moment(clickedDate).format("YYYY-MM-DD")
        }
      })
    } else {
      setViewDate(clickedDate);
      setCurrDisplay("Day");
    }
  }

  // <-- Helper Component -->
  const Event = ({ event }) => {
    const toggleMore = useState(false);

    let backgroundColor = "#c4bb97" + alphaHex;
    if (event.reservation) backgroundColor = colors.reservation;
    else if (event.session) backgroundColor = colors.session;

    const isMe = (event) => {
      return user && user.id === event.service?.freelancer?.id;
    }

    const eventDetails = (event, showMore) => {
      if (!event) return [];

      if (showMore) {
        if (event.reservation) return getReservationDetails(event.reservation, true);
        if (event.session) {
          const sessionDetails = getSessionDetails(event.session);
          sessionDetails.unshift({ label: "Host", content: isMe(event) ? "Me" : event.service?.freelancer?.username });
          sessionDetails.unshift({ label: "Service Name", content: event.service?.name, tag: "h2" });
          return sessionDetails;
        }
      }

      return [{
        label: event.service?.name + (isMe(event) ? "" : ` (${event.service?.freelancer?.username})`),
        content: myDate.timeframeDur(event.when_start, event.duration_min), tag: "h1"
      }];
    }

    return <div className="card p-3 m-6 flex items-center" style={{ backgroundColor, position: 'relative' }} >
      <div className="flex flex-col justify-center justify-items-center  max-w-full">
        {eventDetails(event, toggleMore[0]).map(d => <Detail {...d} />)}
      </div>
      <div className="flex flex-row" style={{ placeItems: 'center', position: 'absolute', top: "0.75rem", right: 0 }}>
        {!isMyCalendar && event.session &&
          <BookButton session={event.session} updateFn={fetchDisplayUser} />
        }
        <ToggleButton text={["Show More", "Show Less"]} state={toggleMore} />
      </div>
    </div>
  }

  // <-- Sub Component -->
  const DayDisplay = (props) => {
    const dayEvents = calendarMonthData[getDayIdx(viewDate)]?.events ?? [];

    return <div className="primary-color-t card p-4 mb-4">
      {dayEvents.length > 0
        ? dayEvents.map(evt => <Event event={evt} />)
        : <div>No events on this day.</div>
      }
    </div >
  }

  // <-- Sub Component -->
  const MonthDisplay = (props) => {
    return <div className="calendar-grid-container">
      {moment.weekdays().map((e, i) => <div key={e} className="calendar-grid-cell" style={cellStyle(i)}>{e}</div>)}
      {calendarMonthData.map((e, i) => (
        <button key={i}
          className={`calendar-grid-cell ${isClickable(i) ? "clickable" : ""}`}
          style={cellStyle(gridW + i)}
          disabled={!isClickable(i)}
          onClick={(e) => onClickCell(e, i)}>
          <CellContents data={e} />
        </button>
      ))}
    </div>
  }

  // <-- Sub Component -->
  const AgendaDisplay = (props) => {
    const agendaEvents = allEvents.filter(evt => myDate.compareDays(evt.when_start, viewDate) >= 0);

    return <div className="primary-color-t card p-4 mb-4">
      {agendaEvents.length > 0 ?
        agendaEvents.map((evt, i) => {
          return <>
            {(i === 0 || !myDate.areSameDay(evt.when_start, agendaEvents[i - 1].when_start)) && <>
              {(i === 0 || !myDate.areSameYear(evt.when_start, agendaEvents[i - 1].when_start)) &&
                <div className="border-black border-t-2 pt-2 font-bold text-lg">{moment(evt.when_start).format("YYYY")}</div>
              }
              <div className="border-black border-b-2 mt-1 pb-2 font-semibold">{moment(evt.when_start).format("ddd, MMM DD")}</div>
            </>}
            <Event event={evt} />
          </>
        }) : <div>No events from this day.</div>
      }
    </div >
  }

  // <-- Switch Component -->
  const CurrentDisplay = (props) => {
    switch (currDisplay) {
      case "Day": return <DayDisplay />
      case "Month": return <MonthDisplay />
      case "Agenda": return <AgendaDisplay />
    }

    return <div>Unknown Display selected</div>
  }

  const getTitleDate = () => {
    switch (currDisplay) {
      case "Month": return moment(viewDate).format("MMMM YYYY");
      case "Agenda":
        let result = moment(viewDate).format("MM/DD/YYYY");
        if (allEvents.length > 0 && myDate.compareDays(allEvents.at(-1).when_start, viewDate) > 0)
          result += " - " + moment(allEvents.at(-1).when_start).format("MM/DD/YYYY")
        return result;
    }
    return moment(viewDate).format("dddd, MMMM Do, YYYY");
  }

  return <section className="flex flex-col surface-color card calendar-container textShadow">
    <h1 className="home-title-text searchbar-text-color font-bold mb-4">
      {(isMyCalendar ? "My" : `${displayUser?.username ?? "Who"}'s`) + " Calendar"}
    </h1>
    <div className="flex justify-around p-1 m-1">
      <div className="buttonContainer flexItemUniformSize">
        <MyButton text={"Today"} onClick={(e) => setViewDate(new Date())} />
        {[
          { text: "Previous", onClick: (e) => incrementDate(-1) },
          { text: "Next", onClick: (e) => incrementDate(1) },
        ].map(e => <MyButton {...e} />)}
      </div>

      <div className="flexItemUniformSize justify-center">
        <div className="text-xl surface-text p-2 ">{getTitleDate()}</div>
      </div>

      <div className="buttonContainer flexItemUniformSize">
        {["Day", "Month", "Agenda"].map(e => <MyButton text={e} onClick={() => setCurrDisplay(e)} />)}
        <ToggleButton text={["Add", "Cancel"]} cssType={"submit"} state={toggleAdding} />
      </div>
    </div>
    {isAdding && <CreateSession services={displayUser?.services} reactiveData={formDefault} />}
    <CurrentDisplay />
  </section >
}

export default Calendar;