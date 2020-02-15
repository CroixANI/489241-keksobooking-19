'use strict';

(function () {
  var isActiveState = false;

  function setPageStateToActive() {
    isActiveState = true;
    window.map.showMap();
    window.form.toggleDisabledState(false);
    window.map.filter.toggleDisabledState(false);
  }

  function setPageStateToDisabled() {
    isActiveState = false;
    window.map.hideMap();
    window.form.toggleDisabledState(true);
    window.map.filter.toggleDisabledState(true);
  }

  function isPageActive() {
    return isActiveState;
  }

  window.page = window.page || {};
  window.page.setPageStateToActive = setPageStateToActive;
  window.page.setPageStateToDisabled = setPageStateToDisabled;
  window.page.isPageActive = isPageActive;
})();
