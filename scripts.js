const { DateTime, Interval } = luxon;

function getTimeToGraduation( // defaults to my graduation time
  timeZone = "America/Chicago",
  year = 2021,
  month = 5,
  day = 1,
  hour = 12,
  minute = 0
) {
  // set time for graduation start
  let graduationTime = DateTime.fromObject({
    zone: timeZone,
    year: year,
    month: month,
    day: day,
    hour: hour,
    minute: minute,
  });

  // get current time in graduation timezone
  let nowInGradTimezone = DateTime.fromObject({ zone: timeZone });

  // return time difference as a luxon Interval object
  updateCount(Interval.fromDateTimes(nowInGradTimezone, graduationTime));
  return Interval.fromDateTimes(nowInGradTimezone, graduationTime);
}

function updateCount(intervalToGraduation) {
  const UnitsOfTime = ["days", "hours", "minutes", "seconds"]; // element IDs and luxon time units

  if (intervalToGraduation.isValid) {
    // graduation has not happened yet
    // convert Interval to luxon Duration for parsing time units
    const timeToGraduation = intervalToGraduation.toDuration(UnitsOfTime);

    UnitsOfTime.forEach((elemId) => {
      let elemText = timeToGraduation[elemId]
        .toString()
        .split(".")[0] // only show whole seconds
        .padStart(2, "0"); // keep at least two digits

      document.getElementById(elemId).innerText = elemText;
    });
  } else {
    // graduation has happened
    // TODO: update UI with something congratulatory
  }
}

function initialize() {
  let interval = getTimeToGraduation(); // call with defaults

  setInterval(function () {
    updateCount(interval);
  }, 1000);
}

function storeGradDate() {}
