'use strict';

(function () {
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var MAP_MAIN_PIN_INACTIVE_SIZE = 65;
  var MAP_MAIN_PIN_SELECTOR = '.map__pin--main';

  var event = new Event('positionChanged');
  var mainPinElement = document.querySelector(MAP_MAIN_PIN_SELECTOR);

  function onMapMainPinMouseDown(evt) {
    window.utils.events.isMouseLeftButtonEvent(evt, window.page.setPageStateToActive);
  }

  function onMapMainPinKeyDown(evt) {
    window.utils.events.isEnterEvent(evt, window.page.setPageStateToActive);
  }

  function configureMapMainPinEventListeners() {
    mainPinElement.addEventListener('mousedown', onMapMainPinMouseDown);
    mainPinElement.addEventListener('keydown', onMapMainPinKeyDown);
    window.draggable.makeDraggable(mainPinElement, mainPinElement, function () {
      mainPinElement.dispatchEvent(event);
    });
  }

  function getMainPinAddress() {
    var isPageActive = window.page.isPageActive();
    var position;
    if (isPageActive) {
      position = {
        x: Math.floor(mainPinElement.offsetLeft + PIN_WIDTH / 2),
        y: Math.floor(mainPinElement.offsetTop + PIN_HEIGHT)
      };
    } else {
      position = {
        x: Math.floor(mainPinElement.offsetLeft + MAP_MAIN_PIN_INACTIVE_SIZE / 2),
        y: Math.floor(mainPinElement.offsetTop + MAP_MAIN_PIN_INACTIVE_SIZE / 2)
      };
    }

    return position.x + ', ' + position.y;
  }

  configureMapMainPinEventListeners();

  window.pins = window.pins || {};
  window.pins.main = window.pins.main || {};
  window.pins.main.getMainPinAddress = getMainPinAddress;
})();
