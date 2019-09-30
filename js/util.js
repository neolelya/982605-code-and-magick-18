'use strict';

(function () {
  window.util = {
    getRandomArrayItem: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  };
})();
