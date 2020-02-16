'use strict';

(function () {
  var MAP_MAIN_PIN_SELECTOR = '.map__pin--main';

  var AD_FORM_SELECTOR = '.ad-form';
  var AD_FORM_DISABLED_CLASS = 'ad-form--disabled';
  var AD_FORM_ADDRESS_FIELD_SELECTOR = '#address';
  var AD_FORM_APARTMENT_TYPE_FIELD_SELECTOR = '#type';
  var AD_FORM_PRICE_FIELD_SELECTOR = '#price';
  var AD_FORM_ROOMS_NUMBER_FIELD_SELECTOR = '#room_number';
  var AD_FORM_CAPACITY_FIELD_SELECTOR = '#capacity';
  var AD_FORM_CHECK_IN_FIELD_SELECTOR = '#timein';
  var AD_FORM_CHECK_OUT_FIELD_SELECTOR = '#timeout';

  var ROOMS_TO_GUESTS = {
    '1': 1,
    '2': 2,
    '3': 3,
    '100': 0
  };
  var NOT_FOR_GUESTS_FLAG = 0;
  var MESSAGE_INCORRECT_GUESTS_NUMBER = 'Не верное число гостей.';

  var apartmentTypesData = window.data.mocks.getApartmentTypesData();
  var adFormElement = document.querySelector(AD_FORM_SELECTOR);

  function onAdFormApartmentTypeChange(evt) {
    setPriceMinValue(evt.currentTarget.value);
  }

  function onAdFormRoomsNumberChange() {
    validateGuestsNumberField();
  }

  function onAdFormGuestsNumberChange() {
    validateGuestsNumberField();
  }

  function onAdFormCheckInTimeChange(evt) {
    changeCheckInOutTime(evt.currentTarget.value);
  }

  function onAdFormCheckOutTimeChange(evt) {
    changeCheckInOutTime(evt.currentTarget.value);
  }

  function setPriceMinValue(apartmentType) {
    if (!apartmentType) {
      apartmentType = adFormElement.querySelector(AD_FORM_APARTMENT_TYPE_FIELD_SELECTOR).value;
    }
    var apartmentDataMinPrice = apartmentTypesData[apartmentType].minPrice;
    if (apartmentType) {
      var priceElement = adFormElement.querySelector(AD_FORM_PRICE_FIELD_SELECTOR);
      priceElement.placeholder = apartmentDataMinPrice;
      priceElement.min = apartmentDataMinPrice;
    }
  }

  function validateGuestsNumberField() {
    var roomsNumberElement = adFormElement.querySelector(AD_FORM_ROOMS_NUMBER_FIELD_SELECTOR);
    var guestsNumberElement = adFormElement.querySelector(AD_FORM_CAPACITY_FIELD_SELECTOR);
    var guestsNumber = parseInt(guestsNumberElement.value, 10);
    var roomsNumber = parseInt(roomsNumberElement.value, 10);
    var roomsCapacity = ROOMS_TO_GUESTS[roomsNumber];
    if ((guestsNumber === NOT_FOR_GUESTS_FLAG && roomsCapacity !== guestsNumber)
      || guestsNumber > roomsCapacity) {
      guestsNumberElement.setCustomValidity(MESSAGE_INCORRECT_GUESTS_NUMBER);
    } else {
      guestsNumberElement.setCustomValidity('');
    }
    guestsNumberElement.reportValidity();
  }

  function changeCheckInOutTime(newValue) {
    var checkInElement = adFormElement.querySelector(AD_FORM_CHECK_IN_FIELD_SELECTOR);
    checkInElement.value = newValue;
    var checkOutElement = adFormElement.querySelector(AD_FORM_CHECK_OUT_FIELD_SELECTOR);
    checkOutElement.value = newValue;
  }

  function configureCheckInCheckoutFields() {
    var checkInElement = adFormElement.querySelector(AD_FORM_CHECK_IN_FIELD_SELECTOR);
    checkInElement.addEventListener('change', onAdFormCheckInTimeChange);
    var checkOutElement = adFormElement.querySelector(AD_FORM_CHECK_OUT_FIELD_SELECTOR);
    checkOutElement.addEventListener('change', onAdFormCheckOutTimeChange);
  }

  function configureRoomsNumberField() {
    var roomsNumberElement = adFormElement.querySelector(AD_FORM_ROOMS_NUMBER_FIELD_SELECTOR);
    roomsNumberElement.addEventListener('change', onAdFormRoomsNumberChange);
  }

  function configureGuestsNumberField() {
    var roomsNumberElement = adFormElement.querySelector(AD_FORM_CAPACITY_FIELD_SELECTOR);
    roomsNumberElement.addEventListener('change', onAdFormGuestsNumberChange);
  }

  function configureAddressField() {
    var addressElement = adFormElement.querySelector(AD_FORM_ADDRESS_FIELD_SELECTOR);
    addressElement.value = window.pins.main.getMainPinAddress();
  }

  function configureApartmentTypeField() {
    var typeElement = adFormElement.querySelector(AD_FORM_APARTMENT_TYPE_FIELD_SELECTOR);
    typeElement.addEventListener('change', onAdFormApartmentTypeChange);
  }

  function configureAdFormFields() {
    configureAddressField();
    configureApartmentTypeField();
    configureRoomsNumberField();
    configureGuestsNumberField();
    configureCheckInCheckoutFields();
  }

  function toggleDisabledState(disabledFlag) {
    window.utils.setDisabledAttributeForFormFieldsets(adFormElement, disabledFlag);
    if (disabledFlag) {
      adFormElement.classList.add(AD_FORM_DISABLED_CLASS);
    } else {
      adFormElement.classList.remove(AD_FORM_DISABLED_CLASS);
    }

    configureAddressField();
  }

  configureAdFormFields();
  setPriceMinValue();
  document.querySelector(MAP_MAIN_PIN_SELECTOR)
    .addEventListener('positionChanged', configureAddressField, false);

  window.form = window.form || {};
  window.form.toggleDisabledState = toggleDisabledState;
})();
