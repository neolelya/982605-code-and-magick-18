'use strict';
var MESSAGE_WIDTH = 420;
var MESSAGE_HEIGHT = 270;
var MESSAGE_X = 100;
var MESSAGE_Y = 10;
var GAP = 10;
var BAR_WIDTH = 40;
var MAX_HEIGHT = 150;
var padding = GAP * 3;
var maxBarHeight = 150;
var columnWidth = (MESSAGE_WIDTH - padding * 2) / 4;

var renderMessage = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, MESSAGE_WIDTH, MESSAGE_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderMessage(ctx, MESSAGE_X + GAP, MESSAGE_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderMessage(ctx, MESSAGE_X, MESSAGE_Y, 'white');

  var fontSize = 16;
  ctx.font = fontSize + 'px PT Mono';
  ctx.strokeText('Ура вы победили!', MESSAGE_X + padding, MESSAGE_Y + padding);
  ctx.strokeText('Список результатов:', MESSAGE_X + padding, MESSAGE_Y + padding + fontSize);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = 'black';
    ctx.fillText(names[i], MESSAGE_X + padding + columnWidth * i, MESSAGE_HEIGHT - padding);
    var blueTint = 'hsl(' + (240 - 25 * i) + ',' + (70 - i * 10) + '%, 50%)';
    ctx.fillStyle = names[i] === 'Вы' ? 'red' : blueTint;

    var barHeight = maxBarHeight * times[i] / maxTime;
    ctx.fillRect(MESSAGE_X + padding + columnWidth * i, MESSAGE_Y + padding * 2 + MAX_HEIGHT - barHeight, BAR_WIDTH, barHeight);
  }
};
