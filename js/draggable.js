'use strict';

(function () {
  var MIN_X = -32;
  var MAX_X = 1166;
  var MIN_Y = 130;
  var MAX_Y = 630;

  function makeDraggable(dragHandleElement, draggableElement, action) {
    dragHandleElement.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var draggable = false;
      var startCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      function onMouseMove(moveEvt) {
        evt.preventDefault();

        draggable = true;

        var shift = {
          x: startCoordinates.x - moveEvt.clientX,
          y: startCoordinates.y - moveEvt.clientY
        };

        startCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var resultY = draggableElement.offsetTop - shift.y;
        var resultX = draggableElement.offsetLeft - shift.x;
        if (resultY < MIN_Y) {
          resultY = MIN_Y;
        } else if (resultY > MAX_Y) {
          resultY = MAX_Y;
        }

        if (resultX < MIN_X) {
          resultX = MIN_X;
        } else if (resultX > MAX_X) {
          resultX = MAX_X;
        }

        draggableElement.style.top = resultY + 'px';
        draggableElement.style.left = resultX + 'px';
      }

      function onMouseUp(upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (draggable) {
          action();
        }
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  window.draggable = {};
  window.draggable.makeDraggable = makeDraggable;
})();
