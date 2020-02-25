'use strict';

(function () {
  var MAX_PINS_TO_DISPLAY = 5;
  var MAP_FILTERS_SELECTOR = '.map__filters';
  var MAP_FILTER_HOUSING_TYPE_SELECTOR = '#housing-type';

  var housingTypeElement = document.querySelector(MAP_FILTER_HOUSING_TYPE_SELECTOR);

  function renderFilteredData() {
    window.data.applyFilter(getFilter());
    window.card.hideCard();
    window.pins.renderPins();
  }

  function onHousingTypeChange(evt) {
    if (evt.target.value !== '') {
      renderFilteredData();
    }
  }

  function addEventListeners() {
    housingTypeElement.addEventListener('change', onHousingTypeChange);
  }

  function removeEventListeners() {
    housingTypeElement.removeEventListener('change', onHousingTypeChange);
  }

  function toggleDisabledState(disabledFlag) {
    var formElement = document.querySelector(MAP_FILTERS_SELECTOR);
    window.utils.setDisabledAttributeForFormFieldsets(formElement, disabledFlag);

    if (disabledFlag) {
      removeEventListeners();
    } else {
      addEventListeners();
      window.data.applyFilter(getFilter());
    }
  }

  function getFilter() {
    return {
      housingType: housingTypeElement.value,
      maxItems: MAX_PINS_TO_DISPLAY
    };
  }

  window.map = window.map || {};
  window.map.filter = window.map.filter || {};
  window.map.filter.toggleDisabledState = toggleDisabledState;
})();
