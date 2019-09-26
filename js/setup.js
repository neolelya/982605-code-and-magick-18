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
dialogWindow.classList.remove('hidden');

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
var coatColor = setup.querySelector('.wizard-coat');
var eyesColor = setup.querySelector('.wizard-eyes');
var fireballColor = setup.querySelector('.setup-fireball-wrap');

var popupEscHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', popupEscHandler);
};

var closePopup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', popupEscHandler);
};

setupOpen.addEventListener('click', openPopup);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', closePopup);

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE && evt.target !== setup.querySelector('input')) {
    closePopup();
  }
});

var userNameInput = document.querySelector('.setup-user-name');
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25 символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Это поле обязательное для заполнения');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

var coatClickHandler = function () {
  coatColor.style.fill = getRandomArrayItem(COAT_COLORS);
};

coatColor.addEventListener('click', coatClickHandler);

var eyesClickHandler = function () {
  eyesColor.style.fill = getRandomArrayItem(EYE_COLORS);
};

eyesColor.addEventListener('click', eyesClickHandler);

var fireballClickHandler = function () {
  fireballColor.style.background = getRandomArrayItem(FIREBALL_COLORS);
};

fireballColor.addEventListener('click', fireballClickHandler);
