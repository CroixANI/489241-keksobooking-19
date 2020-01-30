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
var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
var AVATAR_URL_FORMAT = 'img/avatars/user0{{x}}.png';
var MIN_ROOM_NUMBER = 1;
var MAX_ROOM_NUMBER = 5;
var MIN_GUAESTS_ALLOWED = 1;
var MAX_GUAESTS_ALLOWED = 5;
var MIN_HOTELS = 10;
var MAX_HOTELS = 10;
var HOTEL_PHOTO_FORMAT = 'http://o0.github.io/assets/images/tokyo/hotel{{x}}.jpg';
var INITIAL_MOCKS_NUMBER = 8;
var MIN_PRICE = 10000;
var MAX_PRICE = 1000000;

// Render constants
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var MAP_SELECTOR = '.map';
var MAP_FADE_CLASS = 'map--faded';
var PINS_CONTAINER_SELECTOR = '.map__pins';
var PIN_TEMPLATE_SELECTOR = '#pin';
var PIN_TEMPLATE_BUTTON_SELECTOR = '.map__pin';


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

function getRandomArray(initialArray) {
  var result = [];
  var max = random(1, initialArray.length);
  var numbers = getRandomUniqueNumbers(max);

  for (var i = 0; i < numbers; i++) {
    result.push(FEATURES[numbers[i] - 1]);
  }

  return result;
}

function getRandomPhotosArray() {
  var photos = [];
  var max = random(MIN_HOTELS, MAX_HOTELS);
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
      'features': getRandomArray(FEATURES),
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

function renderRandomPins() {
  var mapPinsElement = document.querySelector(PINS_CONTAINER_SELECTOR);
  var pinTemplate = document.querySelector(PIN_TEMPLATE_SELECTOR).content.querySelector(PIN_TEMPLATE_BUTTON_SELECTOR);
  var data = generateApartments();
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(renderPin(pinTemplate, data[i]));
  }

  mapPinsElement.appendChild(fragment);
}

function showMap() {
  var mapElement = document.querySelector(MAP_SELECTOR);
  mapElement.classList.remove(MAP_FADE_CLASS);
}

showMap();
renderRandomPins();
