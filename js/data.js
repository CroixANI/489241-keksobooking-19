'use strict';

(function () {
  var PINS_DATA_URL = 'https://js.dump.academy/keksobooking/data';

  // data constants
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var APARTMENT_TYPES_DATA = {
    'palace': {
      'title': 'Дворец',
      'minPrice': 10000
    },
    'flat': {
      'title': 'Квартира',
      'minPrice': 1000
    },
    'house': {
      'title': 'Дом',
      'minPrice': 5000
    },
    'bungalo': {
      'title': 'Бунгало',
      'minPrice': 0
    }
  };

  var apartments;

  function getApartments(onLoad) {
    if (!apartments) {
      window.backend.load(PINS_DATA_URL, function (data) {
        if (data instanceof Array) {
          apartments = data;
          onLoad(apartments);
        } else {
          window.utils.showError('Unable to load data.');
        }
      }, window.utils.showError);
    } else {
      onLoad(apartments);
    }
  }

  function getApartmentByIndex(index) {
    if (index >= 0 && index < apartments.length) {
      return apartments[index];
    }
    return null;
  }

  function getFeatures() {
    return FEATURES;
  }

  function getApartmentTypesData() {
    return APARTMENT_TYPES_DATA;
  }

  window.data = window.data || {};
  window.data.getFeatures = getFeatures;
  window.data.getApartmentTypesData = getApartmentTypesData;
  window.data.getApartments = getApartments;
  window.data.getApartmentByIndex = getApartmentByIndex;
})();
