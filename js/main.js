'use strict';

window.page.setOnPageStateChangedListener(function (isActive) {
  if (isActive) {
    window.map.showMap();
    window.form.toggleDisabledState(false);
    window.map.filter.toggleDisabledState(false);
  } else {
    window.map.hideMap();
    window.form.toggleDisabledState(true);
    window.map.filter.toggleDisabledState(true);
  }
});
window.page.setPageStateToDisabled();
