'use strict';

(function () {
  var MAP_SELECTOR = '.map';
  var MAP_FILTER_SELECTOR = '.map__filters-container';
  var CARD_TEMPLATE = '#card';
  var CARD_SELECTOR = '.map__card';
  var CARD_CLOSE_SELECTOR = '.popup__close';
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

  var features = window.data.mocks.getFeatures();
  var apartmentTypesData = window.data.mocks.getApartmentTypesData();
  var filterElement = document.querySelector(MAP_FILTER_SELECTOR);
  var mapElement = document.querySelector(MAP_SELECTOR);
  var cardTemplate = document.querySelector(CARD_TEMPLATE).content;

  function onCardEscapeKeydown(evt) {
    window.utils.events.isEscapeEvent(evt, hidePinCardPopup);
  }

  function onCardCloseButtonClick() {
    hidePinCardPopup();
  }

  function fillPhotos(cardElement, apartmentData) {
    var photosElement = cardElement.querySelector(CARD_PHOTOS_SELECTOR);
    var photoElement = cardElement.querySelector(CARD_PHOTO_SELECTOR);
    var photos = apartmentData.offer.photos;
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

  function fillFeatures(cardElement, apartmentData) {
    var featuresContainer = cardElement.querySelector(CARD_FEATURES_SELECTOR);

    for (var i = 0; i < features.length; i++) {
      var feature = features[i];
      if (apartmentData.offer.features.indexOf(feature) < 0) {
        featuresContainer.querySelector(CARD_FEATURE_SELECTOR_FORMAT.replace('{{x}}', feature)).remove();
      }
    }
  }

  function renderCard(apartmentData) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector(CARD_TITLE_SELECTOR).textContent = apartmentData.offer.title;
    cardElement.querySelector(CARD_ADDRESS_SELECTOR).textContent = apartmentData.offer.address;
    cardElement.querySelector(CARD_PRICE_SELECTOR).textContent = CARD_PRICE_FORMAT.replace('{{x}}', apartmentData.offer.price);
    cardElement.querySelector(CARD_TYPE_SELECTOR).textContent = apartmentTypesData[apartmentData.offer.type].title;
    cardElement.querySelector(CARD_CAPACITY_SELECTOR).textContent = CARD_CAPACITY_FORMAT
      .replace('{{rooms}}', apartmentData.offer.rooms)
      .replace('{{guests}}', apartmentData.offer.guests);
    cardElement.querySelector(CARD_TIME_SELECTOR).textContent = CARD_TIME_FORMAT
      .replace('{{checkin}}', apartmentData.offer.checkin)
      .replace('{{checkout}}', apartmentData.offer.checkout);
    cardElement.querySelector(CARD_DESCRIPTION_SELECTOR).textContent = apartmentData.offer.description;
    cardElement.querySelector(CARD_AVATAR_SELECTOR).src = apartmentData.author.avatar;

    fillFeatures(cardElement, apartmentData);
    fillPhotos(cardElement, apartmentData);

    var closeButtonElement = cardElement.querySelector(CARD_CLOSE_SELECTOR);
    closeButtonElement.addEventListener('click', onCardCloseButtonClick);

    return cardElement;
  }

  function hidePinCardPopup() {
    var element = mapElement.querySelector(CARD_SELECTOR);
    if (element !== null) {
      element.remove();
    }
    document.removeEventListener('keydown', onCardEscapeKeydown);
  }

  function showCard(pinData) {
    hidePinCardPopup();
    mapElement.insertBefore(renderCard(pinData), filterElement);
    document.addEventListener('keydown', onCardEscapeKeydown);
  }

  window.card = window.card || {};
  window.card.showCard = showCard;
})();
