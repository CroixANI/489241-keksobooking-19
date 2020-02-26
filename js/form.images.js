'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  function addImageLoader(element, onLoad) {
    element.addEventListener('change', function () {
      var file = element.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          onLoad(reader.result);
        });

        reader.readAsDataURL(file);
      }
    });
  }

  window.data.addImageLoader = addImageLoader;
})();
