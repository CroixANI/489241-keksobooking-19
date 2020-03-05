'use strict';

(function () {
  var SUCCESS_CODE = 200;
  var CONNECTION_ERROR_MESSAGE = 'Connection error.';
  var TIMEOUT_ERROR_MESSAGE = 'Timeout happened.';
  var GENERAL_ERROR_MESSAGE_FORMAT = 'Response error with status = {0} and message = {1}';

  function sendAjax(url, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        var message = GENERAL_ERROR_MESSAGE_FORMAT
          .replace('{0}', xhr.status)
          .replace('{1}', xhr.statusText);
        onError(message);
      }
    });

    xhr.addEventListener('error', function () {
      onError(CONNECTION_ERROR_MESSAGE);
    });

    xhr.addEventListener('timeout', function () {
      onError(TIMEOUT_ERROR_MESSAGE);
    });

    if (data) {
      xhr.open('POST', url);
      xhr.send(data);
    } else {
      xhr.open('GET', url);
      xhr.send();
    }
  }

  function load(url, onLoad, onError) {
    sendAjax(url, null, onLoad, onError);
  }

  function save(url, data, onLoad, onError) {
    sendAjax(url, data, onLoad, onError);
  }

  window.backend = {};
  window.backend.load = load;
  window.backend.save = save;
})();
