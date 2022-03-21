const pomodoroTimer = document.querySelector('#pomodoro-timer')

const startButton = document.querySelector('#pomodoro-start')
const pauseButton = document.querySelector('#pomodoro-pause')
const stopButton = document.querySelector('#pomodoro-stop')

let isClockRunning = false;
// in seconds = 25 mins
let workSessionDuration = 1500;
let currentTimeLeftInSession = 1500;

// in seconds = 5 mins
let breakSessionDuration = 300;

// START
startButton.addEventListener('click', () => {
    toggleClock()
})

// PAUSE
pauseButton.addEventListener('click', () => {
    toggleClock()
})

// STOP
stopButton.addEventListener('click', () => {
    toggleClock(true)
})

const toggleClock = (reset) => {
    if (reset) {
        // STOP THE TIMER
        stopClock()
    } else {
        if (isClockRunning === true) {
            // PAUSE THE TIMER
            clearInterval(clockTimer)
            isClockRunning = false
        } else {
            // START THE TIMER
            isClockRunning = true

            clockTimer = setInterval(() => {
                // decrease time left / increase time spent
                currentTimeLeftInSession--
                displayCurrentTimeLeftInSession()
              }, 1000)
        }
    }
}

const displayCurrentTimeLeftInSession = () => {
    const secondsLeft = currentTimeLeftInSession
    let result = ''
    const seconds = secondsLeft % 60
    const minutes = parseInt(secondsLeft / 60) % 60
    let hours = parseInt(secondsLeft / 3600)
    // add leading zeroes if it's less than 10
    function addLeadingZeroes(time) {
        return time < 10 ? `0${time}` : time
    }
    if (hours > 0) result += `${hours}:`
    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`
    pomodoroTimer.innerText = result.toString()
}

const stopClock = () => {
    // 1) reset the timer we set
    clearInterval(clockTimer)
    // 2) update our variable to know that the timer is stopped
    isClockRunning = false
    // reset the time left in the session to its original state
    currentTimeLeftInSession = workSessionDuration
    // update the timer displayed
    displayCurrentTimeLeftInSession()
  }