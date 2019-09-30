'use strict';

(function () {
  var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var QUANTITY = 4;

  var dialogWindow = document.querySelector('.setup');

  var similarSetup = dialogWindow.querySelector('.setup-similar');
  similarSetup.classList.remove('hidden');

  var similarListElement = dialogWindow.querySelector('.setup-similar-list');
  var similarWizardTemplate =
    document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var getRandomWizard = function () {
    return {
      name: window.util.getRandomArrayItem(WIZARDS_NAMES) + ' ' + window.util.getRandomArrayItem(WIZARDS_SURNAMES),
      coatColor: window.util.getRandomArrayItem(window.constants.COAT_COLORS),
      eyesColor: window.util.getRandomArrayItem(window.constants.EYE_COLORS),
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
})();
