'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

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
  var AD_FORM_RESET_BUTTON_SELECTOR = '.ad-form__reset';
  var AD_FORM_AVATAR_FILE_SELECTOR = '.ad-form__field input[type=file]';
  var AD_FORM_AVATAR_PREVIEW_SELECTOR = '.ad-form-header__preview img';
  var AD_FORM_APARTMENT_FILE_SELECTOR = '.ad-form__upload input[type=file]';
  var AD_FORM_APARTMENT_PREVIEW_CONTAINER_SELECTOR = '.ad-form__photo-container';
  var AD_FORM_APARTMENT_PREVIEW_SELECTOR = '.ad-form__photo';
  var AD_FORM_APARTMENT_PREVIEW_SIZE = '70px';
  var AD_FORM_APARTMENT_PREVIEW_CLASS = 'popup__photo';
  var AD_FORM_APARTMENT_PREVIEW_ALT = 'Фотография жилья';

  var ROOMS_TO_GUESTS = {
    '1': 1,
    '2': 2,
    '3': 3,
    '100': 0
  };
  var NOT_FOR_GUESTS_FLAG = 0;
  var MESSAGE_INCORRECT_GUESTS_NUMBER = 'Не верное число гостей.';

  var apartmentTypesData = window.data.getApartmentTypesData();
  var adFormElement = document.querySelector(AD_FORM_SELECTOR);
  var adFormAvatarFileElement = document.querySelector(AD_FORM_AVATAR_FILE_SELECTOR);
  var adFormAvatarPreviewElement = document.querySelector(AD_FORM_AVATAR_PREVIEW_SELECTOR);
  var adFormApartmentFileElement = document.querySelector(AD_FORM_APARTMENT_FILE_SELECTOR);
  var adFormNextApartmentPreviewElement = document.querySelector(AD_FORM_APARTMENT_PREVIEW_SELECTOR);
  var adFormApartmentPreviewContainerElement = document.querySelector(AD_FORM_APARTMENT_PREVIEW_CONTAINER_SELECTOR);

  function onFormResetClick() {
    window.page.setPageStateToDisabled();
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    window.data.submitApartment(new FormData(adFormElement), function () {
      onFormResetClick();
      window.utils.showSuccess();
    });
  }

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
    document.querySelector(AD_FORM_RESET_BUTTON_SELECTOR)
      .addEventListener('click', onFormResetClick);
  }

  function addFormSubmitEventListeners() {
    adFormElement.addEventListener('submit', onFormSubmit);
  }

  function removeFormSubmitEventListeners() {
    adFormElement.removeEventListener('submit', onFormSubmit);
  }

  function toggleDisabledState(disabledFlag) {
    window.utils.setDisabledAttributeForFormFieldsets(adFormElement, disabledFlag);
    if (disabledFlag) {
      adFormElement.reset();
      removeFormSubmitEventListeners();
      adFormElement.classList.add(AD_FORM_DISABLED_CLASS);
    } else {
      addFormSubmitEventListeners();
      adFormElement.classList.remove(AD_FORM_DISABLED_CLASS);
    }

    configureAddressField();
  }

  function addImageLoader(element, onLoad) {
    element.addEventListener('change', function () {
      var file = element.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          onLoad(reader.result);
        });

        reader.readAsDataURL(file);
      }
    });
  }

  function initialize() {
    configureAdFormFields();
    setPriceMinValue();
    addImageLoader(adFormAvatarFileElement, function (image) {
      adFormAvatarPreviewElement.src = image;
    });
    addImageLoader(adFormApartmentFileElement, function (image) {
      var imageElement = document.createElement('img');
      imageElement.src = image;
      imageElement.alt = AD_FORM_APARTMENT_PREVIEW_ALT;
      imageElement.classList.add(AD_FORM_APARTMENT_PREVIEW_CLASS);
      imageElement.style.height = AD_FORM_APARTMENT_PREVIEW_SIZE;
      imageElement.style.width = AD_FORM_APARTMENT_PREVIEW_SIZE;

      var clone = adFormNextApartmentPreviewElement.cloneNode(true);
      adFormApartmentPreviewContainerElement.appendChild(clone);
      adFormNextApartmentPreviewElement.appendChild(imageElement);
      adFormNextApartmentPreviewElement = clone;
    });
    document.querySelector(MAP_MAIN_PIN_SELECTOR)
      .addEventListener('positionChanged', configureAddressField, false);
  }

  initialize();

  window.form = {};
  window.form.toggleDisabledState = toggleDisabledState;
})();
