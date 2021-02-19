// set up Luxon
const { DateTime } = luxon;
// give setInterval global scope
let timerHandle;

function updateCount(gradTime) {
  const UnitsOfTime = ["days", "hours", "minutes", "seconds"]; // element IDs and luxon time units

  // get Duration from now to graduation time
  let timeToGraduation = gradTime.diffNow().shiftTo(...UnitsOfTime);

  if (timeToGraduation.seconds > 0) {
    // graduation has not happened yet, so update
    UnitsOfTime.forEach((elemId) => {
      document.getElementById(elemId).innerText = timeToGraduation[elemId]
        .toString()
        .split(".")[0] // only show whole seconds
        .padStart(2, "0"); // keep at least two digits
    });
  } else {
    // graduation has happened, so set timer to 0 and clear interval
    clearInterval(timerHandle);
    UnitsOfTime.forEach((elemId) => {
      document.getElementById(elemId).innerText = "00";
    });
    // update message
    document.getElementById("descriptor").innerText =
      "Congratulations, you've graduated!";
  }
}

function initialize() {
  // set up counter
  let defaultGraduationTime = DateTime.fromObject({
    zone: "America/Chicago",
    year: 2021,
    month: 5,
    day: 1,
    hour: 12,
    minute: 0,
  });

  // get grad date from local storage if present, otherwise use default
  let userDate = window.localStorage.getItem("userGrad");
  let gradDate;
  if (userDate !== null) {
    gradDate = DateTime.fromISO(userDate);
  } else {
    gradDate = defaultGraduationTime;
  }

  // set timer with grad date
  setTimer(gradDate);

  // set up modal controls
  let dateModal = document.getElementById("set-date-modal");
  // open modal
  document.getElementById("open-modal").onclick = () => {
    dateModal.style.display = "flex";
  };
  // close modal if user clicks off
  window.onclick = (event) => {
    if (event.target === dateModal) {
      dateModal.style.display = "none";
    }
  };
}

function setTimer(gradDate) {
  // clear timer handle if it's set
  if (timerHandle !== null) {
    clearInterval(timerHandle);
  }

  // set timer with new date
  timerHandle = setInterval(() => {
    updateCount(gradDate);
  }, 1000);
}

function setUserGrad() {
  let gradDate = document.getElementById("grad-time");

  // reportValidity() uses build in form controls to alert user if the date isn't filled in
  if (gradDate.reportValidity()) {
    // save date to local storage
    window.localStorage.setItem("userGrad", gradDate.value);

    // update timer
    setTimer(DateTime.fromISO(gradDate));
  }
}
