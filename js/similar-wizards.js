'use strict';

(function () {
  var wizards = [];
  var currentCoatColor;
  var currentEyesColor;

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === currentCoatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === currentEyesColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render.renderWizards(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.wizard.onCoatChange(window.util.debounce(function (color) {
    currentCoatColor = color;
    updateWizards();
  }));

  window.wizard.onEyesChange(window.util.debounce(function (color) {
    currentEyesColor = color;
    updateWizards();
  }));

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  var errorHandler = function (errorMessage) {
    window.message.createMessage(errorMessage);
  };

  window.backend.load(successHandler, errorHandler);
})();
