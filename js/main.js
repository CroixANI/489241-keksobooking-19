'use strict';

// Map render zone
var MIN_X = 100;
var MAX_X = 800;
var MIN_Y = 130;
var MAX_Y = 630;

// Data mocks constants
var TITLES = ['Всемирный торговый центр 1', 'Эмпайр-стейт-билдинг', 'Парк-авеню, 432', 'Хадсон-Ярдс, 30',
  'Башня Банка Америки', 'Всемирный торговый центр 3', 'Крайслер-билдинг', 'Нью-Йорк-Таймс-билдинг', 'Ситигруп-центр',
  'Нью-Йорк-бай-Гери', 'Трамп-уорлд-тауэр', 'Уан Манхэттен Сквер', 'Сити-спайр-центр'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var APARTMENT_TYPES_LOCALIZATION = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
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

// Render constants
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var MAP_SELECTOR = '.map';
var MAP_FILTER_SELECTOR = '.map__filters-container';
var MAP_FADE_CLASS = 'map--faded';
var PINS_CONTAINER_SELECTOR = '.map__pins';
var PIN_TEMPLATE_SELECTOR = '#pin';
var PIN_TEMPLATE_BUTTON_SELECTOR = '.map__pin';

var CARD_TEMPLATE = '#card';
var CARD_TEMPLATE_POPUP = '.popup';
var CARD_TITLE_SELECTOR = '.popup__title';
var CARD_ADDRESS_SELECTOR = '.popup__text--address';
var CARD_PRICE_SELECTOR = '.popup__text--price';
var CARD_PRICE_FORMAT = '{{x}}₽/ночь';
var CARD_TYPE_SELECTOR = '.popup__type';
var CARD_CAPACITY_SELECTOR = '.popup__text--capacity';
var CARD_CAPACITY_FORMAT = '{{rooms}} комнаты для {{guests}} гостей';
var CARD_TIME_SELECTOR = '.popup__text--time';
var CARD_TIME_FORMAT = 'Заезд после {{checkin}}, выезд до {{checkout}}';
var CARD_FEATURES_SELECTOR = '.popup__features';
var CARD_FEATURE_SELECTOR_FORMAT = '.popup__feature--{{x}}';
var CARD_DESCRIPTION_SELECTOR = '.popup__description';
var CARD_PHOTOS_SELECTOR = '.popup__photos';
var CARD_PHOTO_SELECTOR = '.popup__photo';
var CARD_AVATAR_SELECTOR = '.popup__avatar';

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomArrayItem(array) {
  var index = random(0, array.length - 1);
  return array[index];
}

// took from here https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var swapIndex = random(0, i);
    var currentItem = array[i];
    array[i] = array[swapIndex];
    array[swapIndex] = currentItem;
  }
  return array;
}

function getRandomUniqueNumbers(total) {
  var numbers = [];

  for (var i = 0; i < total; i++) {
    numbers.push(i + 1);
  }

  return shuffleArray(numbers);
}

function getRandomArray(initialArray, min) {
  var result = [];
  var max = random(min, initialArray.length);
  var numbers = getRandomUniqueNumbers(max);

  for (var i = 0; i < numbers.length; i++) {
    result.push(FEATURES[numbers[i] - 1]);
  }

  return result;
}

function getRandomPhotosArray() {
  var photos = [];
  var max = random(MIN_HOTEL_PHOTOS, MAX_HOTEL_PHOTOS);
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
      'title': getRandomArrayItem(TITLES),
      'address': '',
      'price': random(MIN_PRICE, MAX_PRICE),
      'type': getRandomArrayItem(APARTMENT_TYPES),
      'rooms': random(MIN_ROOM_NUMBER, MAX_ROOM_NUMBER),
      'guests': random(MIN_GUAESTS_ALLOWED, MAX_GUAESTS_ALLOWED),
      'checkin': getRandomArrayItem(CHECK_IN_TIMES),
      'checkout': getRandomArrayItem(CHECK_OUT_TIMES),
      'features': getRandomArray(FEATURES, MIN_FEATURES),
      'description': '',
      'photos': getRandomPhotosArray()
    },
    'location': {
      x: random(MIN_X, MAX_X),
      y: random(MIN_Y, MAX_Y)
    }
  };

  result.offer.address = result.location.x + ', ' + result.location.y;

  return result;
}

function generateApartments() {
  var data = [];

  for (var i = 0; i < INITIAL_MOCKS_NUMBER; i++) {
    data.push(getRandomApartment(i));
  }

  return data;
}

function getPinCenterPosition(data) {
  return {
    x: data.location.x - PIN_WIDTH / 2,
    y: data.location.y - PIN_HEIGHT
  };
}

function renderPin(pinTemplate, data) {
  var element = pinTemplate.cloneNode(true);
  var center = getPinCenterPosition(data);
  element.setAttribute('style', 'left: ' + center.x + 'px; top: ' + center.y + 'px;');
  var imgElement = element.querySelector('img');
  imgElement.src = data.author.avatar;
  imgElement.alt = data.offer.title;

  return element;
}

function renderCard(cardTemplate, data) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(CARD_TITLE_SELECTOR).textContent = data.offer.title;
  cardElement.querySelector(CARD_ADDRESS_SELECTOR).textContent = data.offer.address;
  cardElement.querySelector(CARD_PRICE_SELECTOR).textContent = CARD_PRICE_FORMAT.replace('{{x}}', data.offer.price);
  cardElement.querySelector(CARD_TYPE_SELECTOR).textContent = APARTMENT_TYPES_LOCALIZATION[data.offer.type];
  cardElement.querySelector(CARD_CAPACITY_SELECTOR).textContent = CARD_CAPACITY_FORMAT
    .replace('{{rooms}}', data.offer.rooms)
    .replace('{{guests}}', data.offer.guests);
  cardElement.querySelector(CARD_TIME_SELECTOR).textContent = CARD_TIME_FORMAT
    .replace('{{checkin}}', data.offer.checkin)
    .replace('{{checkout}}', data.offer.checkout);
  cardElement.querySelector(CARD_DESCRIPTION_SELECTOR).textContent = data.offer.description;
  cardElement.querySelector(CARD_AVATAR_SELECTOR).src = data.author.avatar;

  fillFeatures(cardElement, data);
  fillPhotos(cardElement, data);

  return cardElement;
}

function fillPhotos(cardElement, data) {
  var photosElement = cardElement.querySelector(CARD_PHOTOS_SELECTOR);
  var photoElement = cardElement.querySelector(CARD_PHOTO_SELECTOR);
  var photos = data.offer.photos;
  if (photos.length > 0) {
    var fragment = document.createDocumentFragment();
    photoElement.src = photos[0];
    for (var j = 1; j < photos.length; j++) {
      var newPhotoElement = photoElement.cloneNode(true);
      newPhotoElement.src = photos[j];
      fragment.appendChild(newPhotoElement);
    }
    if (fragment.childElementCount > 0) {
      photosElement.appendChild(fragment);
    }
  } else {
    photoElement.remove();
  }
}

function fillFeatures(cardElement, data) {
  var featuresContainer = cardElement.querySelector(CARD_FEATURES_SELECTOR);
  for (var i = 0; i < FEATURES.length; i++) {
    var feature = FEATURES[i];
    if (data.offer.features.indexOf(feature) < 0) {
      featuresContainer.querySelector(CARD_FEATURE_SELECTOR_FORMAT.replace('{{x}}', feature)).remove();
    }
  }
}

function renderCards(data) {
  var mapElement = document.querySelector(MAP_SELECTOR);
  mapElement.classList.remove(MAP_FADE_CLASS);
  var filterElement = document.querySelector(MAP_FILTER_SELECTOR);
  var cardTemplate = document.querySelector(CARD_TEMPLATE).content.querySelector(CARD_TEMPLATE_POPUP);
  mapElement.insertBefore(renderCard(cardTemplate, data[0]), filterElement);
}

function renderRandomPins(data) {
  var mapPinsElement = document.querySelector(PINS_CONTAINER_SELECTOR);
  var pinTemplate = document.querySelector(PIN_TEMPLATE_SELECTOR).content.querySelector(PIN_TEMPLATE_BUTTON_SELECTOR);
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(renderPin(pinTemplate, data[i]));
  }

  mapPinsElement.appendChild(fragment);
}

function showMap() {
  var data = generateApartments();
  renderRandomPins(data);
  renderCards(data);
}

showMap();

