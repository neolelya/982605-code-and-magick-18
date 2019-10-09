'use strict';

(function () {
  var setupOpen = document.querySelector('.setup-open');

  setupOpen.addEventListener('click', window.dialog.popupOpenButtonClickHandler);
  setupOpen.addEventListener('keydown', window.dialog.iconEnterKeydownHandler);
})();
