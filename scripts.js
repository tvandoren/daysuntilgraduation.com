// set up Luxon
const { DateTime } = luxon;

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
    setTimer(null);
    UnitsOfTime.forEach((elemId) => {
      document.getElementById(elemId).innerText = "00";
    });
    // update message
    document.getElementById("descriptor").innerText =
      "Congratulations, you've graduated!";
  }
}

function initialize() {
  // get grad date from local storage if present
  const userDate = window.localStorage.getItem("userGrad");

  if (userDate !== null) {
    // count down to user-provided date
    setTimer(DateTime.fromISO(userDate));
  } else {
    // count down to default date
    setTimer(
      DateTime.fromObject({
        zone: "America/Chicago",
        year: 2021,
        month: 5,
        day: 1,
        hour: 12,
        minute: 0,
      })
    );
  }

  // set up modal controls
  const dateModal = document.getElementById("set-date-modal");
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
  // clear timer handle if it's set or if no date is given
  if (this.timerHandle != null || gradDate == null) {
    clearInterval(this.timerHandle);
  }

  // set timer with new date
  if (gradDate != null) {
    this.timerHandle = setInterval(() => {
      updateCount(gradDate);
    }, 1000);
  }
}

function setUserGrad() {
  let gradDate = document.getElementById("grad-time");

  // reportValidity() uses built-in form controls to alert user if the date isn't filled in
  if (gradDate.reportValidity()) {
    // save date to local storage
    window.localStorage.setItem("userGrad", gradDate.value);

    // update timer
    setTimer(DateTime.fromISO(gradDate.value));

    // close modal
    document.getElementById("set-date-modal").style.display = "none";
  }
}
