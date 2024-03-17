"use strict";

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const delay = parseInt(this.elements.delay.value, 10);
      const state = form.querySelector('input[name="state"]:checked').value;

      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          (state === 'fulfilled') ? resolve(delay) : reject(delay);
        }, delay);
      });

      promise.then(
        delay => showSnackbar('Success', `✅ Fulfilled promise in ${delay}ms`, '#59A10D'),
        delay => showSnackbar('Error', `❌ Rejected promise in ${delay}ms`, '#EF4040')
      );
    });
  }

  function showSnackbar(title, message, backgroundColor) {
    const toastOptions = {
      title: title,
      message: message,
      backgroundColor: backgroundColor,
    };

    if (title === 'Success') {
      iziToast.success(toastOptions);
    } else if (title === 'Error') {
      iziToast.error(toastOptions);
    }
  }
});