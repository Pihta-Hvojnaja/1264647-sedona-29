// переключатель формы поиска
const search = document.querySelector('.search');
const searchToggle = search.querySelector('.search__button__toggle');
const searchModal = search.querySelector('.search__modal');

//валидация полей
const buttonModal = searchModal.querySelector('.search__button__modal');
const inputModal = searchModal.querySelectorAll('input[required]');
let missing = false;

// кнопки полей 
const btnMinus = searchModal.querySelectorAll('.search__btn__minus');
const btnPlus = searchModal.querySelectorAll('.search__btn__plus');
const inputCount = searchModal.querySelectorAll('.search__count');

// stars
const hotels = docunent.querySelector('.hotels');
const stars = hotels.querySelectorAll('.star');
const cardInfo = hotels.querySelectorAll('.card__info');

// переключатель формы поиска
searchToggle.addEventListener('click', function (evt) {
  evt.preventDefault();
    
  if (searchModal.classList.contains('not__appear')) {
    searchModal.classList.remove('not__appear');
    searchModal.classList.add('appear');

  } else  {
    searchModal.classList.remove('appear');
    searchModal.classList.toggle('not__appear');
  }
})

// валидация полей
buttonModal.addEventListener('click', function () {
  
  searchModal.classList.remove('shake');
  searchModal.offsetWidth = searchModal.offsetWidth;

  for (let i = 0; i < inputModal.length; i++) {
    if (!inputModal[i].value) {
      missing = true;
      inputModal[i].classList.add('error');

    } else { 
      inputModal[i].classList.remove('error'); 
    }
  }
  
  if (missing) {
    searchModal.classList.add('shake');
  } 
})

// кнопки полей 
for (let i = 0; i < btnMinus.length; i++) {
  btnMinus[i].addEventListener('click', function (evt) {
    evt.preventDefault();

    let number = parseInt(inputCount[i].value, 10);
    if (number > 0) {
      inputCount[i].value = number - 1;
    }
  })
}

for (let i = 0; i < btnPlus.length; i++) {
  btnPlus[i].addEventListener('click', function (evt) {
    evt.preventDefault();

    let number = parseInt(inputCount[i].value, 10);
    if (number < 100) {
      inputCount[i].value = number + 1;
    }
  })
}


// stars 
for (let i = 0; i < stars.length; i++) {
  if (cardInfo[i].dataset.star < 2000) {
    stars[i].classList.add('star__1');
  } else if (cardInfo[i].dataset.star >= 2000 && cardInfo[i].dataset.star < 3000) {
    stars[i].classList.add('star__2');
  } else if (cardInfo[i].dataset.star >= 3000 && cardInfo[i].dataset.star < 4000) {
    stars[i].classList.add('star__3');
  } else if (cardInfo[i].dataset.star >= 4000 && cardInfo[i].dataset.star < 5000) {
    stars[i].classList.add('star__4');
  } else if (cardInfo[i].dataset.star > 5000) {
    stars[i].classList.add('star__5');
  }
}





