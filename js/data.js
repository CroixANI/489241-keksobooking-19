'use strict';

(function () {
  var PINS_DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var SUBMIT_URL = 'https://js.dump.academy/keksobooking';
  var ANY_VALUE = 'any';

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
        initialApartments = data.filter(function (item) {
          return item.hasOwnProperty('offer');
        });
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

  function doesMatchHousingTypeFilter(filter, apartment) {
    return filter.housingType === ANY_VALUE
      || apartment.offer.type !== filter.housingType;
  }

  function doesMatchToPriceFilter(filter, apartment) {
    return filter.priceRange === null
      || (apartment.offer.price >= filter.priceRange.min
        && (apartment.offer.price < filter.priceRange.max || filter.priceRange.max === 0));
  }

  function doesMatchToRoomsNumberFilter(filter, apartment) {
    return filter.roomsNumber === ANY_VALUE
      || apartment.offer.rooms.toString() === filter.roomsNumber;
  }

  function doesMatchToGuestsNumberFilter(filter, apartment) {
    return filter.guestsNumber === ANY_VALUE
      || apartment.offer.guests.toString() === filter.guestsNumber;
  }

  function doesMatchToFeaturesFilter(filter, apartment) {
    var apartmentFeatures = apartment.offer.features || [];
    var hasAllFeatures = filter.features.filter(function (feature) {
      return apartmentFeatures.indexOf(feature) >= 0;
    }).length === filter.features.length;

    return filter.features.length === 0 || hasAllFeatures;
  }

  function applyFilter(filter) {
    apartments = initialApartments.filter(function (apartment) {
      return doesMatchHousingTypeFilter(filter, apartment)
        && doesMatchToPriceFilter(filter, apartment)
        && doesMatchToRoomsNumberFilter(filter, apartment)
        && doesMatchToGuestsNumberFilter(filter, apartment)
        && doesMatchToFeaturesFilter(filter, apartment);
    });

    if (filter.maxItems) {
      apartments = apartments.slice(0, filter.maxItems);
    }
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
