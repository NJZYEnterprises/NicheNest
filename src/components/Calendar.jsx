import moment from "moment";
import "../Calendar.css"
import { useEffect } from "react";
import Fetcher from "../fetcher";
import { useState } from "react";
import MyButton from './buttons/MyButton';
import ToggleButton from "./buttons/ToggleButton";
import CreateSession from "./CreateSessionForm";
import myString from "../utils/myString.cjs";

const fetcher = new Fetcher("api/users/calendar");
const alphaHex = "d0";
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
  const [user, setUser] = useState(null);
  const [currDisplay, setCurrDisplay] = useState("Month");
  const [viewDate, setViewDate] = useState(new Date());
  const toggleAdding = useState(false);
  const isAdding = toggleAdding[0];
  const [formDefault, setFormDefault] = useState({});

  const gridW = 7;

  useEffect(() => {
    if (forUser?.id && !user) {
      fetcher.route(forUser.id.toString()).get(setUser);
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
    const checkFormat = "MMMM DD YYYY";
    const checkMoment = moment(checkDate).format(checkFormat);
    return calendarData.findIndex(({ date }) => moment(date).format(checkFormat) === checkMoment);
  }

  const incrementMonth = (byNum) => {
    setViewDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + byNum);
      return newDate;
    });
  }

  const calendarData = daysOfTheMonth(viewDate).map((e, i) => { return { index: i, date: e, reservations: [], sessions: [] } });
  // console.log(visibleDays.map(d => moment(d).format("MMMM Do")));

  user?.services?.forEach(srvc => {
    srvc.sessions?.forEach((sn) => {
      const dayIndex = getDayIdx(sn.when_start);
      if (dayIndex >= 0) {
        calendarData[dayIndex].sessions.push(sn);
      }
    })
  });

  user?.reservations?.forEach(rsvp => {
    const dayIndex = getDayIdx(rsvp.session?.when_start);
    if (dayIndex >= 0) {
      calendarData[dayIndex].reservations.push(rsvp);
    }
  })

  const CellContents = ({ data }) => {
    // console.log("cell data:", data);
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

  const onClickCell = (e, i) => {
    // console.log(`Cell ${i} clicked`);

    if (isAdding) {
      setFormDefault((prev) => {
        return {
          ...prev,
          date: moment(calendarData[i]?.date).format("YYYY-MM-DD")
        }
      })
    }
  }

  return <section className="flex flex-col surface-color card calendar-container">
    <div className="flex justify-around p-1 m-1">
      <div className="buttonContainer flexItemUniformSize">
        <MyButton text={"Today"} onClick={(e) => setViewDate(new Date())} />
        {[
          { text: "Previous", onClick: (e) => incrementMonth(-1) },
          { text: "Next", onClick: (e) => incrementMonth(1) },
        ].map(e => <MyButton {...e} />)}
      </div>

      <div className="flexItemUniformSize justify-center">
        <div className="text-xl surface-text p-2 ">{moment(viewDate).format("MMMM YYYY")}</div>
      </div>

      <div className="buttonContainer flexItemUniformSize">
        {["Week", "Month", "Agenda"].map(e => <MyButton text={e} />)}
        {/* <MyButton text={"Add"} cssType={"submit"} /> */}
        <ToggleButton text={["Add", "Cancel"]} cssType={"submit"} state={toggleAdding} />
      </div>
    </div>
    {isAdding && <CreateSession services={user?.services} reactiveData={formDefault} />}
    <div className="calendar-grid-container">
      {moment.weekdays().map((e, i) => <div key={e} className="calendar-grid-cell" style={cellStyle(i)}>{e}</div>)}
      {calendarData.map((e, i) => (
        <button key={i} className="calendar-grid-cell clickable" style={cellStyle(gridW + i)} onClick={(e) => onClickCell(e, i)}>
          <CellContents data={e} />
        </button>
      ))}

    </div>
  </section>
}

export default Calendar;