var picsArray = ['🐵', '🦄', '🐞', '🦀', '🐟', '🐊', '🐵', '🦄', '🐞', '🦀', '🐟', '🐊'];
shuffle(picsArray);

function shuffle(arr) {
  var j, x, i;
  for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = arr[i];
      arr[i] = arr[j];
      arr[j] = x;
  }
  let allFrontArr = Array.from(document.querySelectorAll('.front'));
  for(var i = 0; i<= allFrontArr.length - 1; i++) {
    allFrontArr[i].innerHTML = picsArray[i];
  };
};

var cardClick = []; // массив только is-flipped
var count = []; //массив кликов
var totalClicks; //количество кликов всего
var timerOn; //таймер

allCards.onclick = function(e){
  var target = e.target.parentNode.id;
  count.push(target);
  totalClicks = count.length;
  if(totalClicks == 1) {
    timerOn = setInterval(timer, 1000); //включаем таймер по первому клику
  }
  if(target !== 'allCards'){
    var card = document.getElementById(target);
    var back = card.firstElementChild;
    var front = card.lastElementChild;
    back.classList.toggle('is-flipped');
    front.classList.toggle('is-flipped');
    cardClick.push(Array.from(card.childNodes));
    onlyFlip(cardClick);
    sameCard(cardClick);
  }
  let collection = Array.from(document.querySelectorAll(".same")); //все отгаданные карты
  if(collection.length === 12) { //количество отгаданных карт
    clearInterval(timerOn); //выключаем таймер
    setTimeout(() => win.style.display = "block", 700); // вывести модальное окно о выйгрыше с кнопкой play again
    let win = document.getElementById('win');
  }
};

function onlyFlip(arr) { //собираем массив только из is-flipped
  for(let i = arr.length - 1; i >= 0; i--) {
    if(arr[i][1].classList.contains("is-flipped")) {
      continue;
    } else {
      arr.splice(i, 1);
    }
  };
  return arr;
};

function sameCard(cardClick) {
  if(cardClick.length == 2) {
    if(cardClick[0][3].innerHTML === cardClick[1][3].innerHTML) {
      cardClick[0][3].classList.add('same');
      cardClick[1][3].classList.add('same');
      cardClick.splice(0, 2);
    } else {
        cardClick[0][3].classList.add('notsame');
        cardClick[1][3].classList.add('notsame');
        onlyFlip(cardClick);
      }
  } else if(cardClick.length === 3) {
      cardClick[0][3].classList.toggle('is-flipped');
      cardClick[0][1].classList.toggle('is-flipped');
      cardClick[1][3].classList.toggle('is-flipped');
      cardClick[1][1].classList.toggle('is-flipped');
      onlyFlip(cardClick);
      deleteNotsame();
    }
};

function deleteNotsame() { //убираем класс notsame
  let notsame = Array.from(document.getElementsByClassName("notsame"));
  if(notsame[0].classList.contains("notsame")){
    notsame[0].classList.remove("notsame");
  }
  if(notsame[1].classList.contains("notsame")){
    notsame[1].classList.remove("notsame");
  }
};



function timer() {
  let time = document.getElementById("timer").innerHTML;
  let timeArr = time.split(":");
  let sec = timeArr[1];
  sec--;
  if (sec > 10) {
    document.getElementById("timer").innerHTML = "00:" + sec;
  }
  else if (sec < 10 && sec >= 0) {
    document.getElementById("timer").innerHTML = "00:"+'0' + sec;
  }
  else if (sec < 0) {
    clearInterval(timerOn);
    let lose = document.getElementById('lose');
    lose.style.display = "block";
  };
};

function reset() {
  let isFlipped = Array.from(document.querySelectorAll(".is-flipped"));
  let same = Array.from(document.querySelectorAll(".same"));
  let notsame = Array.from(document.querySelectorAll(".notsame"));
  let totalArr = isFlipped.concat(same, notsame);

  lose.style.display = "none";
  win.style.display = "none";

  let i = 0;
  for(; i <= totalArr.length - 1; i++){
    totalArr[i].classList.remove('is-flipped');
    totalArr[i].classList.remove('same');
    totalArr[i].classList.remove('notsame');
  }
  shuffle(picsArray);
  onlyFlip(cardClick);
  count = [];
  let timer = document.getElementById("timer")
  timer.innerHTML = "00:60";
};