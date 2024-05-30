import moment from "moment";
import "../Calendar.css"
import { useEffect } from "react";
import Fetcher from "../fetcher";
import { useState } from "react";

const fetcher = new Fetcher("api/users/calendar");
const colors = {
  unavailable: "#000000d0",
  available: "#c4bb97d0",
  reservation: "#2a4a1cd0",
  session: "#6b9fdbd0",
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

const Calendar = ({ user: forUser }) => {
  const [user, setUser] = useState(null);
  const [viewDate, setViewDate] = useState(new Date());
  const gridW = 7;

  useEffect(() => {
    if (forUser && !user) {
      fetcher.route(forUser?.id.toString()).get(setUser);
    }
  }, [forUser])

  // useEffect(() => {
  //   console.log("calendar user changed:", user);
  // }, [user])

  const buttonClassCSS = (isSubmit) => (isSubmit ? "submit" : "view") + `-button rounded m-1 p-1 text-lg`;
  const Button = ({ content, onClick }) => {
    return <button className={buttonClassCSS(false)} onClick={onClick}>{content}</button>;
  }

  const Event = ({ pos, size }) => {
    return <div className="primary-color-t"
      style={{ gridRow: "3 / span 2", gridColumn: "3 / span 2", zIndex: 10 }}>
      Event
    </div>
  }

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

  const visibleDays = daysOfTheMonth(viewDate);
  // console.log(visibleDays.map(d => moment(d).format("MMMM Do")));

  const getVisibleDayIdx = (checkDate) => {
    const checkFormat = "MMMM DD YYYY";
    const checkMoment = moment(checkDate).format(checkFormat);
    return visibleDays.findIndex(date => moment(date).format(checkFormat) === checkMoment);
  }

  const incrementMonth = (byNum) => {
    setViewDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + byNum);
      return newDate;
    });
  }

  return <section className="flex flex-col surface-color card calendar-container">
    <div className="flex justify-around">
      <Button content={"Today"} onClick={(e) => setViewDate(new Date())} />
      <div>{[
        { content: "Previous", onClick: (e) => incrementMonth(-1) },
        { content: "Next", onClick: (e) => incrementMonth(1) },
      ].map(e => <Button {...e} />)}</div>

      <div className="text-xl">{moment(viewDate).format("MMMM YYYY")}</div>

      <div>{["Week", "Month", "Agenda"].map(e => <Button content={e} />)}</div>
      <button className={buttonClassCSS(true)}>Add</button>
    </div>
    <div className="calendar-grid-container">
      {moment.weekdays().map((e, i) => <div key={e} className="calendar-grid-cell" style={cellStyle(i)}>{e}</div>)}
      {visibleDays.map((e, i) => (
        <div key={i} className="calendar-grid-cell" style={cellStyle(gridW + i)}>
          {e.getDate()}
        </div>
      ))}
      {user && <>
        <>{user.reservations &&
          user.reservations.map(rsvp => {
            const dayIndex = getVisibleDayIdx(rsvp.session?.when_start);
            if (dayIndex < 0) return null;
            return <div style={{...cellStyle(gridW + dayIndex), backgroundColor: colors.reservation}}>
            {/* return <div className="primary-color-t" style={cellStyle(gridW + dayIndex)}> */}
              {`R: ${rsvp.session?.service?.name ?? "Service"}`}
            </div>
          })
        }</>
        <>{user.services &&
          user.services.map(srvc => {
            return srvc.sessions?.map((sn) => {
              const dayIndex = getVisibleDayIdx(sn.when_start);
              if (dayIndex < 0) return null;
              return <div style={{...cellStyle(gridW + dayIndex), backgroundColor: colors.session}}>
                {`S: ${srvc.name ?? "Service"}`}
              </div>
            })
          })
        }</>
      </>}
    </div>
  </section>
}

export default Calendar;