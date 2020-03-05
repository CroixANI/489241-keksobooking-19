'use strict';

(function () {
  var isActiveState = false;
  var onStateChangedAction;

  function setPageStateToActive() {
    isActiveState = true;
    onStateChangedAction(isActiveState);
  }

  function setPageStateToDisabled() {
    isActiveState = false;
    onStateChangedAction(isActiveState);
  }

  function isPageActive() {
    return isActiveState;
  }

  function setOnPageStateChangedListener(action) {
    onStateChangedAction = action;
  }

  window.page = {};
  window.page.setPageStateToActive = setPageStateToActive;
  window.page.setPageStateToDisabled = setPageStateToDisabled;
  window.page.isPageActive = isPageActive;
  window.page.setOnPageStateChangedListener = setOnPageStateChangedListener;
})();
