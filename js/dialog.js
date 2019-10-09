'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = document.querySelector('.setup-user-name');
  var coatColor = setup.querySelector('.wizard-coat');
  var eyesColor = setup.querySelector('.wizard-eyes');
  var fireballColor = setup.querySelector('.setup-fireball-wrap');
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

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

  var openPopup = function () {
    setup.classList.remove('hidden');
    window.similarWizards.appendWizards();
    setupClose.addEventListener('click', popupCloseButtonClickHandler);
    setupClose.addEventListener('keydown', popupEnterCloseHandler);
    userNameInput.addEventListener('focus', inputFocusUseHandler);
    userNameInput.addEventListener('blur', inputBlurUseHandler);
    document.addEventListener('keydown', popupEscKeydownHandler);
    userNameInput.addEventListener('invalid', inputUserNameCheckHandler);
    userNameInput.addEventListener('input', inputNameInputHandler);
    dialogHandle.addEventListener('mousedown', dialogHandleHandler);
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
  };

  var coatClickHandler = function () {
    var color = window.util.getRandomArrayItem(COAT_COLORS);
    coatColor.style.fill = color;
    setup.querySelector('[name="coat-color"]').value = color;
  };

  coatColor.addEventListener('click', coatClickHandler);

  var eyesClickHandler = function () {
    var color = window.util.getRandomArrayItem(EYE_COLORS);
    eyesColor.style.fill = color;
    setup.querySelector('[name="eyes-color"').value = color;
  };

  eyesColor.addEventListener('click', eyesClickHandler);

  var fireballClickHandler = function () {
    var color = window.util.getRandomArrayItem(FIREBALL_COLORS);
    fireballColor.style.backgroundColor = color;
    setup.querySelector('[name="fireball-color"]').value = color;
  };

  fireballColor.addEventListener('click', fireballClickHandler);

  var dialogHandle = setup.querySelector('.upload');

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
