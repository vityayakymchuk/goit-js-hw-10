"use strict";

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const calendar = document.querySelector("input#datetime-picker");
const btn = document.querySelector(".start-btn");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateChoose(selectedDates);
  },
};

let userSelectedDate = flatpickr(calendar, options);

function dateChoose(selectedDates) {
      if (selectedDates[0] <= new Date()) {
          btn.disabled = true;
          showErrorMessage("Error")
      } else {
          btn.disabled = false; 
  };
};

let intervalId;

console.log(userSelectedDate.selectedDates[0].getTime());



function timer() {
  clearInterval(intervalId);
  let currentDate = new Date();
  let ms = userSelectedDate.selectedDates[0] - currentDate;
  updateTimerDisplay(ms);

  intervalId = setInterval(() => {
    updateTimerDisplay(ms);

    if (ms <= 0) {
      clearInterval(intervalId);
      showSuccessMessage('Success!');
    }

    ms -= 1000;
  }, 1000);
};

function showSuccessMessage(message) {
  iziToast.success({
    title: 'Success',
    message: message,
  });
};



function showErrorMessage(message) {
  iziToast.error({
    title: 'Error',
    message: message,
  });
};

function updateElement(selector, value) {
  document.querySelector(selector).textContent = value >= 0 ? addLeadingZero(value) : '00';
}

function updateTimerDisplay(ms) {
  const {days, hours, minutes, seconds } = convertMs(ms);
  updateElement("[data-days]", days);
  updateElement("[data-hours]", hours);
  updateElement("[data-minutes]", minutes);
  updateElement("[data-seconds]", seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
};

btn.addEventListener("click", timer);
document.addEventListener('DOMContentLoaded', () => {btn.disabled = true});