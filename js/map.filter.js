'use strict';

(function () {
  var MAP_FILTERS_SELECTOR = '.map__filters';

  function toggleDisabledState(disabledFlag) {
    var formElement = document.querySelector(MAP_FILTERS_SELECTOR);
    window.utils.setDisabledAttributeForFormFieldsets(formElement, disabledFlag);
  }

  window.map = window.map || {};
  window.map.filter = window.map.filter || {};
  window.map.filter.toggleDisabledState = toggleDisabledState;
})();
