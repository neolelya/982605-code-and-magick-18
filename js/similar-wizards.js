'use strict';

(function () {
  var QUANTITY = 4;

  var dialogWindow = document.querySelector('.setup');

  var similarSetup = dialogWindow.querySelector('.setup-similar');
  similarSetup.classList.remove('hidden');

  var similarListElement = dialogWindow.querySelector('.setup-similar-list');
  var similarWizardTemplate =
    document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < QUANTITY; i++) {
      fragment.appendChild(renderWizard(window.util.getRandomArrayItem(wizards)));
    }
    similarListElement.appendChild(fragment);

    similarSetup.classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    window.message.createMessage(errorMessage);
  };

  window.backend.load(successHandler, errorHandler);
})();
