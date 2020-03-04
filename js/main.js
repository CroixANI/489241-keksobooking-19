'use strict';

(function () {
  window.page.setOnPageStateChangedListener(function (isActive) {
    if (isActive) {
      window.data.loadData(function () {
        window.form.toggleDisabledState(false);
        window.map.filter.toggleDisabledState(false);
        window.map.showMap();
      });
    } else {
      window.card.hideCard();
      window.map.hideMap();
      window.pins.removePins();
      window.pins.main.resetPosition();
      window.form.toggleDisabledState(true);
      window.map.filter.toggleDisabledState(true);
    }
  });
  window.page.setPageStateToDisabled();
})();


