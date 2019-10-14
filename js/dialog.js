'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupClose = setup.querySelector('.setup-close');
  var form = setup.querySelector('.setup-wizard-form');
  var userNameInput = document.querySelector('.setup-user-name');
  var dialogHandle = setup.querySelector('.upload');

  window.dialog = {
    iconEnterKeydownHandler: function (evt) {
      if (window.util.isEnterEvent(evt)) {
        openPopup();
      }
    },

    popupOpenButtonClickHandler: function () {
      openPopup();
    }
  };

  var popupEscKeydownHandler = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closePopup();
    }
  };

  var popupEnterCloseHandler = function (evt) {
    if (window.util.isEnterEvent(evt)) {
      closePopup();
    }
  };

  var inputFocusUseHandler = function () {
    document.removeEventListener('keydown', popupEscKeydownHandler);
  };

  var inputBlurUseHandler = function () {
    document.addEventListener('keydown', popupEscKeydownHandler);
  };

  var inputUserNameCheckHandler = function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25 символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Это поле обязательное для заполнения');
    } else {
      userNameInput.setCustomValidity('');
    }
  };

  var inputNameInputHandler = function (evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  };

  var popupCloseButtonClickHandler = function () {
    closePopup();
  };

  var resetElementCoordinates = function (elem) {
    elem.style.left = null;
    elem.style.top = null;
  };

  var formUploadHandler = function () {
    closePopup();
  };

  var formErrorHandler = function (errorMessage) {
    closePopup();
    window.message.createMessage(errorMessage);
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();
    var formData = new FormData(form);
    window.backend.save(formData, formUploadHandler, formErrorHandler);
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    setupClose.addEventListener('click', popupCloseButtonClickHandler);
    setupClose.addEventListener('keydown', popupEnterCloseHandler);
    userNameInput.addEventListener('focus', inputFocusUseHandler);
    userNameInput.addEventListener('blur', inputBlurUseHandler);
    document.addEventListener('keydown', popupEscKeydownHandler);
    userNameInput.addEventListener('invalid', inputUserNameCheckHandler);
    userNameInput.addEventListener('input', inputNameInputHandler);
    dialogHandle.addEventListener('mousedown', dialogHandleHandler);
    form.addEventListener('submit', formSubmitHandler);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    resetElementCoordinates(setup);
    setupClose.removeEventListener('click', popupCloseButtonClickHandler);
    setupClose.removeEventListener('keydown', popupEnterCloseHandler);
    userNameInput.removeEventListener('focus', inputFocusUseHandler);
    userNameInput.removeEventListener('blur', inputBlurUseHandler);
    document.removeEventListener('keydown', popupEscKeydownHandler);
    userNameInput.removeEventListener('invalid', inputUserNameCheckHandler);
    userNameInput.removeEventListener('input', inputNameInputHandler);
    dialogHandle.removeEventListener('mousedown', dialogHandleHandler);
    form.removeEventListener('submit', formSubmitHandler);
  };

  var dialogHandleHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var dragged = false;

    var handleMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y,
      };

      if (shift.x !== 0 || shift.y !== 0) {
        dragged = true;
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      setup.style.left = (setup.offsetLeft + shift.x) + 'px';
      setup.style.top = (setup.offsetTop + shift.y) + 'px';
    };

    var handleMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', handleMouseMoveHandler);
      document.removeEventListener('mouseup', handleMouseUpHandler);

      if (dragged) {
        var handlePreventDefaultHandler = function (prevEvt) {
          prevEvt.preventDefault();

          dialogHandle.removeEventListener('click', handlePreventDefaultHandler);
        };
        dialogHandle.addEventListener('click', handlePreventDefaultHandler);
      }
    };

    document.addEventListener('mousemove', handleMouseMoveHandler);
    document.addEventListener('mouseup', handleMouseUpHandler);
  };
})();
