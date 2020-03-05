'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var LEFT_MOUSE_BUTTON_CODE = 0;

  function handleKeyEvent(evt, action, keyCode) {
    if (evt.key === keyCode) {
      action();
    }
  }

  function isEscapeEvent(evt, action) {
    handleKeyEvent(evt, action, ESC_KEY);
  }

  function isEnterEvent(evt, action) {
    handleKeyEvent(evt, action, ENTER_KEY);
  }

  function isMouseLeftButtonEvent(evt, action) {
    if (evt.button === LEFT_MOUSE_BUTTON_CODE) {
      action();
    }
  }

  window.utils.events = {};
  window.utils.events.isEscapeEvent = isEscapeEvent;
  window.utils.events.isEnterEvent = isEnterEvent;
  window.utils.events.isMouseLeftButtonEvent = isMouseLeftButtonEvent;
})();
