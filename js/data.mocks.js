'use strict';

(function () {
  // map render zone
  var MIN_X = 85;
  var MAX_X = 620;
  var MIN_Y = 130;
  var MAX_Y = 630;

  // data mocks constants
  var TITLES = ['Всемирный торговый центр 1', 'Эмпайр-стейт-билдинг', 'Парк-авеню, 432', 'Хадсон-Ярдс, 30',
    'Башня Банка Америки', 'Всемирный торговый центр 3', 'Крайслер-билдинг', 'Нью-Йорк-Таймс-билдинг', 'Ситигруп-центр',
    'Нью-Йорк-бай-Гери', 'Трамп-уорлд-тауэр', 'Уан Манхэттен Сквер', 'Сити-спайр-центр'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
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

  var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
  var AVATAR_URL_FORMAT = 'img/avatars/user0{{x}}.png';
  var MIN_ROOM_NUMBER = 1;
  var MAX_ROOM_NUMBER = 5;
  var MIN_GUAESTS_ALLOWED = 1;
  var MAX_GUAESTS_ALLOWED = 5;
  var MIN_HOTEL_PHOTOS = 0;
  var MAX_HOTEL_PHOTOS = 3;
  var HOTEL_PHOTO_FORMAT = 'http://o0.github.io/assets/images/tokyo/hotel{{x}}.jpg';
  var INITIAL_MOCKS_NUMBER = 8;
  var MIN_PRICE = 10000;
  var MAX_PRICE = 1000000;
  var MIN_FEATURES = 2;

  var apartments = generateApartments();

  function getRandomPhotosArray() {
    var photos = [];
    var max = window.utils.random(MIN_HOTEL_PHOTOS, MAX_HOTEL_PHOTOS);
    for (var i = 0; i < max; i++) {
      photos.push(HOTEL_PHOTO_FORMAT.replace('{{x}}', i + 1));
    }

    return photos;
  }

  function getRandomApartment(index) {
    var result = {
      'author': {
        'avatar': AVATAR_URL_FORMAT.replace('{{x}}', index + 1)
      },
      'offer': {
        'title': window.utils.getRandomArrayItem(TITLES),
        'address': '',
        'price': window.utils.random(MIN_PRICE, MAX_PRICE),
        'type': window.utils.getRandomArrayItem(APARTMENT_TYPES),
        'rooms': window.utils.random(MIN_ROOM_NUMBER, MAX_ROOM_NUMBER),
        'guests': window.utils.random(MIN_GUAESTS_ALLOWED, MAX_GUAESTS_ALLOWED),
        'checkin': window.utils.getRandomArrayItem(CHECK_IN_TIMES),
        'checkout': window.utils.getRandomArrayItem(CHECK_OUT_TIMES),
        'features': window.utils.getRandomArray(FEATURES, MIN_FEATURES),
        'description': '',
        'photos': getRandomPhotosArray()
      },
      'location': {
        x: window.utils.random(MIN_X, MAX_X),
        y: window.utils.random(MIN_Y, MAX_Y)
      }
    };

    result.offer.address = result.location.x + ', ' + result.location.y;

    return result;
  }

  function generateApartments() {
    var result = [];

    for (var i = 0; i < INITIAL_MOCKS_NUMBER; i++) {
      result.push(getRandomApartment(i));
    }

    return result;
  }

  function getApartments() {
    return apartments;
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
  window.data.mocks = window.data.mocks || {};
  window.data.mocks.getFeatures = getFeatures;
  window.data.mocks.getApartmentTypesData = getApartmentTypesData;
  window.data.mocks.getApartments = getApartments;
  window.data.mocks.getApartmentByIndex = getApartmentByIndex;
  window.data.mocks.generateApartments = generateApartments;
})();
