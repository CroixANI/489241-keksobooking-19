'use strict';

(function () {
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var PINS_CONTAINER_SELECTOR = '.map__pins';
  var PIN_TEMPLATE_SELECTOR = '#pin';
  var PIN_TEMPLATE_BUTTON_SELECTOR = '.map__pin';
  var MAX_PINS_TO_DISPLAY = 5;

  function onPinClick(evt) {
    var data = window.data.getApartmentByIndex(evt.currentTarget.dataset.index);
    window.card.showCard(data);
  }

  function getPinCenterPosition(apartmentData) {
    return {
      x: apartmentData.location.x - PIN_WIDTH / 2,
      y: apartmentData.location.y - PIN_HEIGHT
    };
  }

  function renderPin(pinTemplate, index) {
    var apartmentData = window.data.getApartmentByIndex(index);
    var element = pinTemplate.cloneNode(true);
    var center = getPinCenterPosition(apartmentData);
    element.setAttribute('style', 'left: ' + center.x + 'px; top: ' + center.y + 'px;');
    var imgElement = element.querySelector('img');
    imgElement.src = apartmentData.author.avatar;
    imgElement.alt = apartmentData.offer.title;
    element.dataset.index = index;
    element.addEventListener('click', onPinClick);
    return element;
  }

  function renderPins() {
    window.data.getApartments(function (apartments) {
      var mapPinsContainerElement = document.querySelector(PINS_CONTAINER_SELECTOR);
      var pinTemplate = document.querySelector(PIN_TEMPLATE_SELECTOR).content.querySelector(PIN_TEMPLATE_BUTTON_SELECTOR);
      var fragment = document.createDocumentFragment();

      var max = apartments.length;
      if (max > MAX_PINS_TO_DISPLAY) {
        max = MAX_PINS_TO_DISPLAY;
      }

      for (var i = 0; i < max; i++) {
        fragment.appendChild(renderPin(pinTemplate, i));
      }

      mapPinsContainerElement.appendChild(fragment);
    });
  }

  window.pins = window.pins || {};
  window.pins.renderPins = renderPins;
})();
