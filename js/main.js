'use strict';

(function () {
  window.main = {
    setupOpen: document.querySelector('.setup-open'),
    setup: document.querySelector('.setup'),

    iconEnterKeydownHandler: function (evt) {
      if (evt.keyCode === window.util.isEnterEvent(evt, window.dialog.openPopup)) {
        window.dialog.openPopup();
      }
    },
    popupOpenButtonClickHandler: function () {
      window.dialog.openPopup();
    }
  };

  window.main.setupOpen.addEventListener('click', window.main.popupOpenButtonClickHandler);
  window.main.setupOpen.addEventListener('keydown', window.main.iconEnterKeydownHandler);
})();
