'use strict';
var MESSAGE_WIDTH = 420;
var MESSAGE_HEIGHT = 270;
var MESSAGE_X = 100;
var MESSAGE_Y = 10;
var GAP = 10;
var BAR_WIDTH = 40;
var BARS_SPACE = 50;
var MAX_HEIGHT = 150;
var PADDING = 30;
var FONT_SIZE = 16;
var MAX_BAR_HEIGHT = 150;
var MESSAGE_WINDOW_COLOR = 'rgba(255, 255, 255, 1)';
var SPECIAL_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var NAME_COLOR = 'rgba(0, 0, 0, 1)';

var renderMessageWindow = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, MESSAGE_WIDTH, MESSAGE_HEIGHT);
};

var renderText = function (ctx, text, x, y) {
  ctx.font = FONT_SIZE + 'px PT Mono';
  ctx.strokeText(text, x, y);
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
  renderMessageWindow(ctx, MESSAGE_X + GAP, MESSAGE_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderMessageWindow(ctx, MESSAGE_X, MESSAGE_Y, MESSAGE_WINDOW_COLOR);

  renderText(ctx, 'Ура вы победили!', MESSAGE_X + PADDING, MESSAGE_Y + PADDING);
  renderText(ctx, 'Список результатов:', MESSAGE_X + PADDING, MESSAGE_Y + PADDING + FONT_SIZE);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = NAME_COLOR;
    ctx.fillText(names[i], MESSAGE_X + PADDING + (BAR_WIDTH + BARS_SPACE) * i, MESSAGE_HEIGHT - PADDING);
    var tint = 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';

    ctx.fillStyle = names[i] === 'Вы' ? SPECIAL_BAR_COLOR : tint;

    var barHeight = MAX_BAR_HEIGHT * times[i] / maxTime;
    ctx.fillRect(MESSAGE_X + PADDING + (BAR_WIDTH + BARS_SPACE) * i, MESSAGE_Y + PADDING * 2 + MAX_HEIGHT - barHeight, BAR_WIDTH, barHeight);
  }
};
