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

  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    similarListElement.innerHTML = '';
    for (var i = 0; i < QUANTITY; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    similarSetup.classList.remove('hidden');
  };

  window.render = {
    renderWizards: renderWizards
  };
})();
