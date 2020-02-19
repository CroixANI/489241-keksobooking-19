'use strict';

(function () {
  function sendAjax(url, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Response error with status = ' + xhr.status + ' and message = ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Connection error.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Timeout happened.');
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

  window.backend = window.backend || {};
  window.backend.load = load;
  window.backend.save = save;
})();
