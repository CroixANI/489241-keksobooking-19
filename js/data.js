'use strict';

(function () {
  var PINS_DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var SUBMIT_URL = 'https://js.dump.academy/keksobooking';

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

  var initialApartments;
  var apartments;

  function getApartments() {
    return apartments;
  }

  function loadData(onLoad) {
    window.backend.load(PINS_DATA_URL, function (data) {
      if (data instanceof Array) {
        initialApartments = data;
        apartments = initialApartments.slice();
        onLoad();
      } else {
        window.utils.showError('Unable to load data.');
      }
    }, window.utils.showError);
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

  function submitApartment(data, onLoad) {
    window.backend.save(SUBMIT_URL, data, onLoad, window.utils.showError);
  }

  function applyFilter(filter) {
    console.log('filtering data...');
    apartments = initialApartments.filter(function (apartment) {
      if (filter.housingType !== 'any' && apartment.offer.type !== filter.housingType) {
        return false;
      }

      return true;
    });


    if (filter.maxItems) {
      apartments = apartments.slice(0, filter.maxItems);
    }

    console.log(apartments);
  }

  window.data = window.data || {};
  window.data.getFeatures = getFeatures;
  window.data.getApartmentTypesData = getApartmentTypesData;
  window.data.getApartments = getApartments;
  window.data.getApartmentByIndex = getApartmentByIndex;
  window.data.submitApartment = submitApartment;
  window.data.loadData = loadData;
  window.data.applyFilter = applyFilter;
})();
