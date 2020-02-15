'use strict';

(function () {
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var PINS_CONTAINER_SELECTOR = '.map__pins';
  var PIN_TEMPLATE_SELECTOR = '#pin';
  var PIN_TEMPLATE_BUTTON_SELECTOR = '.map__pin';

  function onPinClick(evt) {
    var data = window.data.mocks.getApartmentByIndex(evt.currentTarget.dataset.index);
    window.card.showCard(data);
  }

  function getPinCenterPosition(apartmentData) {
    return {
      x: apartmentData.location.x - PIN_WIDTH / 2,
      y: apartmentData.location.y - PIN_HEIGHT
    };
  }

  function renderPin(pinTemplate, index) {
    var apartmentData = window.data.mocks.getApartmentByIndex(index);
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
    var mapPinsContainerElement = document.querySelector(PINS_CONTAINER_SELECTOR);
    var pinTemplate = document.querySelector(PIN_TEMPLATE_SELECTOR).content.querySelector(PIN_TEMPLATE_BUTTON_SELECTOR);
    var fragment = document.createDocumentFragment();

    var apartments = window.data.mocks.getApartments();
    for (var i = 0; i < apartments.length; i++) {
      fragment.appendChild(renderPin(pinTemplate, i));
    }

    mapPinsContainerElement.appendChild(fragment);
  }

  window.pins = window.pins || {};
  window.pins.renderPins = renderPins;
})();
