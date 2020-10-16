// переключатель формы поиска
const search = document.querySelector('.search');
const searchToggle = search.querySelector('.search__button__toggle');
const searchModal = search.querySelector('.search__modal');

//валидация полей
const buttonModal = searchModal.querySelector('.search__button__modal');
const inputModal = searchModal.querySelectorAll('input');
const inputRequired = searchModal.querySelectorAll('input[required]');
const inputDate = searchModal.querySelectorAll('.search__date');
const inputCount = searchModal.querySelectorAll('.search__count');
let missing = false;

// поля search__count 
const btnMinus = searchModal.querySelectorAll('.search__btn__minus');
const btnPlus = searchModal.querySelectorAll('.search__btn__plus');
let isStorageSupport = true;
let storage = "";

// функции
const classAction = function (element, classNameRem, classNameAdd) {
  element.classList.remove(classNameRem);
  element.classList.add(classNameAdd);
}

searchModal.classList.add('collapse__search__modal');
searchModal.classList.add('not__appear');

// переключатель формы поиска
searchToggle.addEventListener('click', function (evt) {
  evt.preventDefault();
  
  searchModal.classList.remove('collapse__search__modal');
  
  searchModal.classList.remove('shake');
  
  if (searchModal.classList.contains('not__appear')) {
    classAction(searchModal, 'not__appear', 'appear');
  } else  {
    classAction(searchModal, 'appear', 'not__appear');
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (!searchModal.classList.contains('not__appear')) {
      evt.preventDefault();
      classAction(searchModal, 'appear', 'not__appear');
    }
  }
});

// валидация полей
buttonModal.addEventListener('click', function () {
  searchModal.classList.remove('shake');
  searchModal.offsetWidth = searchModal.offsetWidth;

  for (let i = 0; i < inputModal.length; i++) {
    
    if (i < inputRequired.length && !inputRequired[i].value) {
      missing = true;
      inputRequired[i].classList.add('error');
    } 

    if (i < inputDate.length) {
      inputDate[i].oninput = function() {
        inputDate[i].classList.remove('error');
      }
    }
  }
  
  if (missing) {
    searchModal.classList.add('shake');
  } 
});

// поля search__count и кнопки
for (let i = 0; i < inputCount.length; i++) {
  let number;
  try {
    storage = localStorage.getItem(i);
  } catch (err) {
    isStorageSupport = false;
  }

  if (storage) {
    number = storage;
    inputCount[i].value = number;
  }

  inputCount[i].oninput = function () {
    inputCount[i].classList.remove('error');
    number = inputCount[i].value;
    
    if (isNaN(number)) {
      inputCount[i].value = '';
    } 
    number = parseInt(inputCount[i].value, 10);
  }
  
  btnMinus[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    if (number > 1) {
      number = inputCount[i].value--;
    }
  });

  btnPlus[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    if (number < 99) {
      number = inputCount[i].value++;
    }
  });
}

searchModal.addEventListener('submit', function () {
  searchModal.classList.remove('shake');
  
  for (let i = 0; i < inputCount.length; i++) {
    if (inputCount[i].value && isStorageSupport) {
      localStorage.setItem(i, inputCount[i].value);
    }
  }
});



