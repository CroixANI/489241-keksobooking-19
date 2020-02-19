'use strict';

(function () {
  var ERROR_TEMPLATE_SELECTOR = '#error';
  var SUCCESS_TEMPLATE_SELECTOR = '#success';
  var SUCCESS_MESSAGE_SELECTOR = '.success';
  var ERROR_MESSAGE_SELECTOR = '.error';
  var ERROR_MESSAGE_BUTTON_SELECTOR = '.error__button';
  var ERROR_MESSAGE_TEXT_SELECTOR = '.error__message';

  function onDocumentClick() {
    removeMessageAndEventListeners();
  }

  function onDocumentEscKeydown(evt) {
    window.utils.events.isEscapeEvent(evt, removeMessageAndEventListeners);
  }

  function attachDocumentEventListeners() {
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentEscKeydown);
  }

  function removeMessageAndEventListeners() {
    var errorElement = document.querySelector(ERROR_MESSAGE_SELECTOR);
    var successElement = document.querySelector(SUCCESS_MESSAGE_SELECTOR);
    if (errorElement !== null) {
      errorElement.remove();
    }
    if (successElement !== null) {
      successElement.remove();
    }
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentEscKeydown);
  }

  function setDisabledAttributeForFormFieldsets(formElement, disabledFlag) {
    var fieldSetElements = formElement.querySelectorAll('fieldset');
    for (var i = 0; i < fieldSetElements.length; i++) {
      fieldSetElements[i].disabled = disabledFlag;
    }
  }

  function showSuccess() {
    var template = document.querySelector(SUCCESS_TEMPLATE_SELECTOR).content
      .querySelector(SUCCESS_MESSAGE_SELECTOR);
    var element = template.cloneNode(true);
    document.body.appendChild(element);
    attachDocumentEventListeners();
  }

  function showError(errorMessage) {
    var template = document.querySelector(ERROR_TEMPLATE_SELECTOR).content
      .querySelector(ERROR_MESSAGE_SELECTOR);
    var errorMessageElement = template.cloneNode(true);
    errorMessageElement.querySelector(ERROR_MESSAGE_TEXT_SELECTOR)
      .textContent = errorMessage;
    errorMessageElement.querySelector(ERROR_MESSAGE_BUTTON_SELECTOR)
      .addEventListener('click', removeMessageAndEventListeners);
    document.body.appendChild(errorMessageElement);
    attachDocumentEventListeners();
  }

  window.utils = window.utils || {};
  window.utils.setDisabledAttributeForFormFieldsets = setDisabledAttributeForFormFieldsets;
  window.utils.showError = showError;
  window.utils.showSuccess = showSuccess;
})();
