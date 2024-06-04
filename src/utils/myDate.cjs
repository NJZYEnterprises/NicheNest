const moment = require("moment");

const myDate = {
  areSameFormatted: (a, b, checkFormat) => {
    return moment(a).format(checkFormat) === moment(b).format(checkFormat);
  },
  areSameDay: (a, b) => {
    return myDate.areSameFormatted(a, b, "MMMM DD YYYY");
  },
  areSameYear: (a, b) => {
    return myDate.areSameFormatted(a, b, "YYYY");
  },

  compareDays: (a, b) => {
    const dates = [new Date(a), new Date(b)];
    // ensure subtraction calculation returns 0 for same day
    dates.forEach(d => {
      d.setHours(0);
      d.setMinutes(0);
      d.setSeconds(0);
      d.setMilliseconds(0);
    })
    return dates[0] - dates[1];
  },

  endDate: (startDate, duration_minutes) => {
    return moment(startDate).add(duration_minutes, 'm').toDate();
  },

  timeframe: (startDate, endDate) => {
    const format = "h:mm a";
    return `${moment(startDate).format(format)} - ${moment(myDate.endDate(endDate)).format(format)}`;
  },

  timeframeDur: (startDate, duration_minutes) => {
    return myDate.timeframe(startDate, myDate.endDate(startDate, duration_minutes));
  },

  dateRange: (startDate, endDate) => {
    const format = "MM/DD/YYYY";
    let result = moment(startDate).format(format);
    if (!myDate.areSameDay(startDate, endDate)) result += " - " + moment(endDate).format(format);
    return result;
  },

  dateRangeDur: (startDate, duration_minutes) => {
    return myDate.dateRange(startDate, myDate.endDate(startDate, duration_minutes));
  },
}

module.exports = myDate;