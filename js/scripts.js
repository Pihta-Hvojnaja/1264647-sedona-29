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

let j;
const classAction = function (element, classNameRem, classNameAdd, time) {
  element.classList.remove(classNameRem);
  element.classList.add(classNameAdd);
  
  if (time) {
    setTimeout(function() {
      if(j === 1) { 
        return; 
      };
      searchModal.classList.add('collapse__search__modal');
    }, time);
  }
}

searchModal.classList.add('collapse__search__modal');
searchModal.classList.add('not__appear');

// переключатель формы поиска
searchToggle.addEventListener('click', function (evt) {
  evt.preventDefault();
  
  searchModal.classList.remove('collapse__search__modal');
  searchModal.classList.remove('shake');
  
  if (searchModal.classList.contains('not__appear')) {
    searchModal.classList.remove('collapse__search__modal');
    classAction(searchModal, 'not__appear', 'appear');
    j = 1;
  } else  {
    classAction(searchModal, 'appear', 'not__appear', 2500);
    j = 0;
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (!searchModal.classList.contains('not__appear')) {
      evt.preventDefault();
      classAction(searchModal, 'appear', 'not__appear', 2500);
      j = 0;
    }
  }
});

// валидация полей
buttonModal.addEventListener('click', function () {
  searchModal.classList.remove('shake');
  searchModal.classList.remove('appear');
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
  
  try {
    storage = localStorage.getItem(i);
  } catch (err) {
    isStorageSupport = false;
  }

  if (storage) {
    inputCount[i].value = storage;
  }

  inputCount[i].oninput = function () {
    inputCount[i].classList.remove('error');
  
    if (isNaN(inputCount[i].value)) {
      inputCount[i].value = "";
    } 
  }
  
  btnMinus[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    if (inputCount[i].value >= 1) {
      inputCount[i].value--;
    }
  });

  btnPlus[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    if (inputCount[i].value < 99) {
      inputCount[i].value++;
    }
  });
}

searchModal.addEventListener('submit', function () {
  
  classAction(searchModal, 'shake', 'collapse__search__modal');
  classAction(searchModal, 'appear', 'not__appear');
  
  for (let i = 0; i < inputCount.length; i++) {
    if (inputCount[i].value && isStorageSupport) {
      localStorage.setItem(i, inputCount[i].value);
    }
  }
});



