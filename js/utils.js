'use strict';

(function () {
  var ERROR_SELECTOR = '.error';
  var ERROR_HIDDEN_CLASS = 'hidden';

  function setDisabledAttributeForFormFieldsets(formElement, disabledFlag) {
    var fieldSetElements = formElement.querySelectorAll('fieldset');
    for (var i = 0; i < fieldSetElements.length; i++) {
      fieldSetElements[i].disabled = disabledFlag;
    }
  }

  function showError(errorMessage) {
    var errorElement = document.querySelector(ERROR_SELECTOR);
    errorElement.classList.remove(ERROR_HIDDEN_CLASS);
    errorElement.textContent = errorMessage;
  }

  function hideError() {
    var errorElement = document.querySelector(ERROR_SELECTOR);
    errorElement.classList.add(ERROR_HIDDEN_CLASS);
  }

  window.utils = window.utils || {};
  window.utils.setDisabledAttributeForFormFieldsets = setDisabledAttributeForFormFieldsets;
  window.utils.showError = showError;
  window.utils.hideError = hideError;
})();
