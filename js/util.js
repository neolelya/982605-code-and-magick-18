'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var getRandomArrayItem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  window.util = {
    isEscEvent: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    },

    isEnterEvent: function (evt) {
      return evt.keyCode === ENTER_KEYCODE;
    },

    getRandomArrayItem: getRandomArrayItem
  };
})();
