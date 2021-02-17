const { DateTime, Duration, Interval } = luxon;

function getTimeToGraduation( // defaults to my graduation time
  timeZone = "America/Chicago",
  year = 2021,
  month = 5,
  day = 1,
  hour = 12,
  minute = 0
) {
  // set time for graduation start
  //let graduationTime = DateTime.local(2021, 5, 1, 12, 0);
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
  console.log(`graduationTime ${graduationTime.toJSON()}`);
  console.log(`nowTime: ${nowInGradTimezone.toJSON()}`);

  return graduationTime;
}

function updateCount(gradTime) {
  const UnitsOfTime = ["days", "hours", "minutes", "seconds"]; // element IDs and luxon time units

  // graduation has not happened yet
  // convert Interval to luxon Duration for parsing time units
  const timeToGraduation = Duration.fromMillis(
    gradTime - DateTime.local()
  ).shiftTo(...UnitsOfTime);

  const didGraduateAlready = gradTime - DateTime.local() <= 0

  UnitsOfTime.forEach((elemId) => {
    let elemText = timeToGraduation[elemId]
      .toString()
      .split(".")[0] // only show whole seconds
      .padStart(2, "0"); // keep at least two digits

    document.getElementById(elemId).innerText = elemText;
  });
}

function initialize() {
  let gradTime = getTimeToGraduation(); // call with defaults

  setInterval(function () {
    updateCount(gradTime);
  }, 1000);
}

function storeGradDate() {}
