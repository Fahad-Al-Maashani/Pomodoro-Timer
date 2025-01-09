let timerInterval;
let minutes = 25; // Initial timer minutes
let seconds = 0; // Initial timer seconds

// Add audio element for the alarm sound
const alarmSound = new Audio('ringbell.wav'); // Ensure the file is in the same directory

const updateDisplay = () => {
  // Update the timer display
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
};

const startTimer = () => {
  // Prevent multiple timers from running simultaneously
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        // Timer finished
        clearInterval(timerInterval);
        timerInterval = null; // Reset timer interval
        alarmSound.currentTime = 0; // Reset sound to the beginning
        alarmSound.play().then(() => {
          alert('Time is up!'); // Sync the alert with sound
        }).catch(err => console.error('Error playing sound:', err));
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateDisplay();
  }, 1000);
};

const pauseTimer = () => {
  // Pause the timer
  clearInterval(timerInterval);
  timerInterval = null;
};

const resetTimer = () => {
  // Reset the timer to initial state
  clearInterval(timerInterval);
  timerInterval = null;
  minutes = 25; // Reset minutes
  seconds = 0; // Reset seconds
  updateDisplay();
};

// Attach event listeners to buttons
document.getElementById('start').addEventListener('click', () => {
  // Play sound briefly to unlock audio context for all browsers
  alarmSound.play().then(() => {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    startTimer(); // Start the timer
  }).catch(err => console.error('Error unlocking audio context:', err));
});

document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

// Initialize the display
updateDisplay();
