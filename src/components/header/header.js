const user = 'Юлий Цезарь';

let elemUser = document.getElementsByClassName('header__user');
elemUser[0].classList.add('header__user_show');

const elemButton = document.getElementsByClassName('header__button');

for (i = 2; i < 4; i++) {
  elemButton[i].classList.add('header__button_show');
}

elemUser = document.getElementsByClassName('user__name');
elemUser[1].innerHTML = user;