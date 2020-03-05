'use strict';

(function () {
  var MAP_SELECTOR = '.map';
  var MAP_FADE_CLASS = 'map--faded';

  var mapElement = document.querySelector(MAP_SELECTOR);

  function hideMap() {
    mapElement.classList.add(MAP_FADE_CLASS);
  }

  function showMap() {
    window.pins.renderPins();
    mapElement.classList.remove(MAP_FADE_CLASS);
  }

  window.map = {};
  window.map.showMap = showMap;
  window.map.hideMap = hideMap;
})();
