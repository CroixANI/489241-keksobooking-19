'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var LEFT_MOUSE_BUTTON_CODE = 0;

  function isEscapeEvent(evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  }

  function isEnterEvent(evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  }

  function isMouseLeftButtonEvent(evt, action) {
    if (evt.button === LEFT_MOUSE_BUTTON_CODE) {
      action();
    }
  }

  window.utils = window.utils || {};
  window.utils.events = window.utils.events || {};
  window.utils.events.isEscapeEvent = isEscapeEvent;
  window.utils.events.isEnterEvent = isEnterEvent;
  window.utils.events.isMouseLeftButtonEvent = isMouseLeftButtonEvent;
})();
