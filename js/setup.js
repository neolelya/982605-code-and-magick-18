'use strict';

var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var QUANTITY = 4;

var getRandomArrayItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var dialogWindow = document.querySelector('.setup');

var similarSetup = dialogWindow.querySelector('.setup-similar');
similarSetup.classList.remove('hidden');

var similarListElement = dialogWindow.querySelector('.setup-similar-list');
var similarWizardTemplate =
  document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomWizard = function () {
  return {
    name: getRandomArrayItem(WIZARDS_NAMES) + ' ' + getRandomArrayItem(WIZARDS_SURNAMES),
    coatColor: getRandomArrayItem(COAT_COLORS),
    eyesColor: getRandomArrayItem(EYE_COLORS),
  };
};

var getMockWizards = function (quantity) {
  var result = [];
  for (var i = 0; i < quantity; i++) {
    result[i] = getRandomWizard();
  }
  return result;
};

var mockWizards = getMockWizards(QUANTITY);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  return fragment;
};
similarListElement.appendChild(renderWizards(mockWizards));

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = document.querySelector('.setup-user-name');
var coatColor = setup.querySelector('.wizard-coat');
var eyesColor = setup.querySelector('.wizard-eyes');
var fireballColor = setup.querySelector('.setup-fireball-wrap');

var popupEscKeydownHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var iconEnterKeydownHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
};

var popupEnterCloseHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
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

var popupOpenButtonClickHandler = function () {
  openPopup();
};

var popupCloseButtonClickHandler = function () {
  closePopup();
};

setupOpen.addEventListener('click', popupOpenButtonClickHandler);
setupOpen.addEventListener('keydown', iconEnterKeydownHandler);

var openPopup = function () {
  setup.classList.remove('hidden');
  setupClose.addEventListener('click', popupCloseButtonClickHandler);
  setupClose.addEventListener('keydown', popupEnterCloseHandler);
  userNameInput.addEventListener('focus', inputFocusUseHandler);
  userNameInput.addEventListener('blur', inputBlurUseHandler);
  document.addEventListener('keydown', popupEscKeydownHandler);
  userNameInput.addEventListener('invalid', inputUserNameCheckHandler);
  userNameInput.addEventListener('input', inputNameInputHandler);
};

var closePopup = function () {
  setup.classList.add('hidden');
  setupClose.removeEventListener('click', popupCloseButtonClickHandler);
  setupClose.removeEventListener('keydown', popupEnterCloseHandler);
  userNameInput.removeEventListener('focus', inputFocusUseHandler);
  userNameInput.removeEventListener('blur', inputBlurUseHandler);
  document.removeEventListener('keydown', popupEscKeydownHandler);
  userNameInput.removeEventListener('invalid', inputUserNameCheckHandler);
  userNameInput.removeEventListener('input', inputNameInputHandler);
};

var coatClickHandler = function () {
  var color = getRandomArrayItem(COAT_COLORS);
  coatColor.style.fill = color;
  setup.querySelector('[name="coat-color"]').value = color;
};

coatColor.addEventListener('click', coatClickHandler);

var eyesClickHandler = function () {
  var color = getRandomArrayItem(EYE_COLORS);
  eyesColor.style.fill = color;
  setup.querySelector('[name="eyes-color"').value = color;
};

eyesColor.addEventListener('click', eyesClickHandler);

var fireballClickHandler = function () {
  var color = getRandomArrayItem(FIREBALL_COLORS);
  fireballColor.style.backgroundColor = color;
  setup.querySelector('[name="fireball-color"]').value = color;
};

fireballColor.addEventListener('click', fireballClickHandler);
