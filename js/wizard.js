'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setup = document.querySelector('.setup');
  var coatColor = setup.querySelector('.wizard-coat');
  var eyesColor = setup.querySelector('.wizard-eyes');
  var inputCoatColor = setup.querySelector('[name="coat-color"]');
  var inputEyesColor = setup.querySelector('[name="eyes-color"');
  var fireballColor = setup.querySelector('.setup-fireball-wrap');
  var inputFireballColor = setup.querySelector('[name="fireball-color"]');

  var coatChangeHandler;
  var eyesChangeHandler;

  var wizard = {
    onCoatChange: function (cb) {
      coatChangeHandler = cb;
    },
    onEyesChange: function (cb) {
      eyesChangeHandler = cb;
    }
  };

  var coatClickHandler = function () {
    var color = window.util.getRandomArrayItem(COAT_COLORS);
    coatColor.style.fill = color;
    inputCoatColor.value = color;
    coatChangeHandler(color);
  };

  coatColor.addEventListener('click', coatClickHandler);

  var eyesClickHandler = function () {
    var color = window.util.getRandomArrayItem(EYE_COLORS);
    eyesColor.style.fill = color;
    inputEyesColor.value = color;
    eyesChangeHandler(color);
  };

  eyesColor.addEventListener('click', eyesClickHandler);

  var fireballClickHandler = function () {
    var color = window.util.getRandomArrayItem(FIREBALL_COLORS);
    fireballColor.style.backgroundColor = color;
    inputFireballColor.value = color;
  };

  fireballColor.addEventListener('click', fireballClickHandler);

  return (window.wizard = wizard);
})();
