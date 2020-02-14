'use strict';

(function () {
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getRandomArrayItem(array) {
    var index = random(0, array.length - 1);
    return array[index];
  }

  // took from here https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var swapIndex = random(0, i);
      var currentItem = array[i];
      array[i] = array[swapIndex];
      array[swapIndex] = currentItem;
    }
    return array;
  }

  function getRandomUniqueNumbers(total) {
    var numbers = [];

    for (var i = 0; i < total; i++) {
      numbers.push(i + 1);
    }

    return shuffleArray(numbers);
  }

  function getRandomArray(initialArray, min) {
    var result = [];
    var max = random(min, initialArray.length);
    var numbers = getRandomUniqueNumbers(max);

    for (var i = 0; i < numbers.length; i++) {
      result.push(initialArray[numbers[i] - 1]);
    }

    return result;
  }

  function setDisabledAttributeForFormFieldsets(formElement, disabledFlag) {
    var fieldSetElements = formElement.querySelectorAll('fieldset');
    for (var i = 0; i < fieldSetElements.length; i++) {
      fieldSetElements[i].disabled = disabledFlag;
    }
  }

  window.utils = window.utils || {};
  window.utils.random = random;
  window.utils.getRandomArray = getRandomArray;
  window.utils.getRandomArrayItem = getRandomArrayItem;
  window.utils.setDisabledAttributeForFormFieldsets = setDisabledAttributeForFormFieldsets;
})();
