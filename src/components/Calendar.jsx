import moment from "moment";
import "../Calendar.css"

const Calendar = (props) => {

  const now = new Date();
  const weekdays = moment.weekdays();
  const months = moment.months();
  // console.log("moment test:", moment.;
  now.get

  const daysOfTheMonth = (date) => {
    console.log("entering daysOfTheMonth");
    const month = date.getMonth();

    console.log("month", month);
    console.log("day", date.getDay());
    console.log("date", date.getDate());
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

  console.log(daysOfTheMonth(now).map(d => moment(d).format("MMMM Do")));

  const buttonClassCSS = (isSubmit) => (isSubmit ? "submit" : "view") + `-button rounded p-1 text-lg`;
  const Button = ({content, onClick}) => {
    return <button className={buttonClassCSS(false)} onClick={onClick}>{content}</button>;
  }

  return <section className="flex flex-col surface-color card">
    <div className="flex justify-around">
      {["Today", "Next", "Previous"].map(e => <Button content={e}/>)}
      <div className="text-xl">{moment().format("MMMM YYYY")}</div>
      {["Week", "Month", "Agenda"].map(e => <Button content={e}/>)}
      <button className={buttonClassCSS(true)}>Add</button>
    </div>
    <div className="calendar-grid-container">
      {moment.weekdays().map(e => <div key={e} className="calendar-grid-item">{e}</div> )}
      {daysOfTheMonth(now).map((e, i) => (
        <div key={i} className="calendar-grid-item">
          {e.getDate()}
        </div>
      ))}
    </div>
  </section>
}

export default Calendar;