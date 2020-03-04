'use strict';

(function () {
  var MAX_PINS_TO_DISPLAY = 5;
  var MAP_FILTERS_SELECTOR = '.map__filters';
  var MAP_FILTER_HOUSING_TYPE_SELECTOR = '#housing-type';
  var MAP_FILTER_HOUSING_PRICE_SELECTOR = '#housing-price';
  var MAP_FILTER_ROOMS_NUMBER_SELECTOR = '#housing-rooms';
  var MAP_FILTER_GUESTS_NUMBER_SELECTOR = '#housing-guests';
  var MAP_FILTER_FEATURES_SELECTOR = '.map__features input';
  var MAP_FILTER_SELECTED_FEATURES = '.map__features input:checked';

  var PRICE_RANGES = {
    any: null,
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: 0
    }
  };

  var housingTypeElement = document.querySelector(MAP_FILTER_HOUSING_TYPE_SELECTOR);
  var housingPriceElement = document.querySelector(MAP_FILTER_HOUSING_PRICE_SELECTOR);
  var housingRoomsElement = document.querySelector(MAP_FILTER_ROOMS_NUMBER_SELECTOR);
  var housingGuestsElement = document.querySelector(MAP_FILTER_GUESTS_NUMBER_SELECTOR);
  var featuresElements = document.querySelectorAll(MAP_FILTER_FEATURES_SELECTOR);

  function renderFilteredData() {
    window.debounce(function () {
      window.data.applyFilter(getFilter());
      window.card.hideCard();
      window.pins.renderPins();
    })();
  }

  function onHousingTypeChange() {
    renderFilteredData();
  }

  function onHousingPriceChange() {
    renderFilteredData();
  }

  function onHousingRoomsChange() {
    renderFilteredData();
  }

  function onHousingGuestsChange() {
    renderFilteredData();
  }

  function onFeaturesChange() {
    renderFilteredData();
  }

  function addEventListeners() {
    housingTypeElement.addEventListener('change', onHousingTypeChange);
    housingPriceElement.addEventListener('change', onHousingPriceChange);
    housingRoomsElement.addEventListener('change', onHousingRoomsChange);
    housingGuestsElement.addEventListener('change', onHousingGuestsChange);
    featuresElements.forEach(function (element) {
      element.addEventListener('change', onFeaturesChange);
    });
  }

  function removeEventListeners() {
    housingTypeElement.removeEventListener('change', onHousingTypeChange);
    housingPriceElement.removeEventListener('change', onHousingPriceChange);
    housingRoomsElement.removeEventListener('change', onHousingRoomsChange);
    housingGuestsElement.removeEventListener('change', onHousingGuestsChange);
    featuresElements.forEach(function (element) {
      element.removeEventListener('change', onFeaturesChange);
    });
  }

  function toggleDisabledState(disabledFlag) {
    var formElement = document.querySelector(MAP_FILTERS_SELECTOR);
    window.utils.setDisabledAttributeForFormFieldsets(formElement, disabledFlag);

    if (disabledFlag) {
      formElement.reset();
      removeEventListeners();
    } else {
      addEventListeners();
      window.data.applyFilter(getFilter());
    }
  }

  function getSelectedFeatures() {
    var selectedElements = document.querySelectorAll(MAP_FILTER_SELECTED_FEATURES);
    var features = [];
    selectedElements.forEach(function (element) {
      features.push(element.value);
    });
    return features;
  }

  function getFilter() {
    return {
      housingType: housingTypeElement.value,
      maxItems: MAX_PINS_TO_DISPLAY,
      priceRange: PRICE_RANGES[housingPriceElement.value],
      roomsNumber: housingRoomsElement.value,
      guestsNumber: housingGuestsElement.value,
      features: getSelectedFeatures()
    };
  }

  window.map = window.map || {};
  window.map.filter = window.map.filter || {};
  window.map.filter.toggleDisabledState = toggleDisabledState;
})();
