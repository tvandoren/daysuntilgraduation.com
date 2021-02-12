function updateTime() {
    setInterval(calculateTime, 1000)
}

function calculateTime() {
    let currentDate = new Date();
    let graduationDate = new Date("05/01/2021")
    graduationDate.setHours(12) // TODO: update once commencement time is released

    let timeDifference = graduationDate.getTime() - currentDate.getTime()

    let numDays = Math.floor(timeDifference / (1000 * 3600 * 24))
    let remainder = timeDifference % (1000 * 3600 * 24)

    let numHours = Math.floor(remainder / (1000 * 3600))
    remainder = remainder % (1000 * 3600)

    let numMinutes = Math.floor(remainder / (1000 * 60))
    remainder = remainder % (1000 * 60)

    let numSeconds = Math.floor(remainder / (1000))

    document.getElementById("time-left").innerText = numDays + " days,\n" + numHours + " hours,\n" + numMinutes + " minutes,\n" + numSeconds + " seconds\n until I graduate!";
}