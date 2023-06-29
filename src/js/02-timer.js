import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dataPicker = document.querySelector('#datetime-picker');
const buttonElement = document.querySelector('button');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let currentDate = new Date();
let selectedDate = null;
let deltaTime = null;
let intervalId = null;

buttonElement.setAttribute('disabled', 'true');

buttonElement.addEventListener('click', onStartTimer);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      selectedDate = selectedDates[0];
      deltaTime = selectedDate - currentDate;
  
      if (selectedDate <= currentDate) {
        return Notiflix.Notify.failure('Please choose a date in the future');
      }
  
      buttonElement.removeAttribute('disabled');
    },
  };
  
  const fp = flatpickr(dataPicker, options);
  
  function onStartTimer(event) {
    updateComponentsTimer(convertMs(deltaTime));
    startTimer();
    buttonElement.setAttribute('disabled', 'true');
    dataPicker.setAttribute('disabled', 'true');
  }
  
  function pad(value) {
    return String(value).padStart(2, '0');
  }
  
  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  
  function startTimer() {
    intervalId = setInterval(() => {
      stopTimer();
  
      deltaTime -= 1000;
      convertMs(deltaTime);
      updateComponentsTimer(convertMs(deltaTime));
    }, 1000);
  }
  
  function stopTimer() {
    if (
      (daysElement.textContent === '00') &
      (hoursElement.textContent === '00') &
      (minutesElement.textContent === '00') &
      (secondsElement.textContent === '01')
    ) {
      clearInterval(intervalId);
    }
  }
  
  function updateComponentsTimer({ days, hours, minutes, seconds }) {
    daysElement.textContent = days.toString();
    hoursElement.textContent = hours.toString();
    minutesElement.textContent = minutes.toString();
    secondsElement.textContent = seconds.toString();
  }
  

