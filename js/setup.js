'use strict';

var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
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
